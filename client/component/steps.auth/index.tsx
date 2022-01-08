import React, {FC, useEffect, useState} from "react";
import { useRouter } from 'next/router'
import style from "./steps.auth.module.scss";
import {CodeConfirmed, RegUser} from "../../helpers/request";
import Welcome from "./welcome";
import Import from "./import";
import People from "./people";
import Photo from "./photo";
import Phone from "./phone";
import Code from "./code";
import Cookies from 'js-cookie'
import Email from "./email";

interface IState {
  id?: string | undefined
  step: number;
  welcome: boolean;
  email: string | undefined;
  password: string | undefined;
  username: string | undefined;
  avatar: string | undefined | File;
  phone: string | undefined;
  code: string | undefined;
}

const StepsAuth: FC = () => {
  const router = useRouter()
  const [state, setState] = useState<IState>({
    step: 0,
    id: undefined,
    welcome: false,
    email: undefined,
    password: undefined,
    username: undefined,
    avatar: undefined,
    phone: undefined,
    code: undefined,
  })

  const WelcomeCallback = (e: React.MouseEvent<HTMLButtonElement>) => setState({...state, step: 1, welcome: true});
  const ImportCallback = (data: {next: boolean, profile: {username: string, avatar: string, phone: string}}) => {
    if(data.profile) return setState({...state, ...data.profile, step: 4});
    if(data.next) setState({...state, step: 2});
  }
  const PeopleCallback = (data: {next: boolean, username?: string}) => {
    if(data.username) return setState({...state, username: data.username, step: 2});
    if(data.next) setState({...state, step: 3});
  }
  const PhotoCallback = (data: {next: boolean, avatar?: File | string | undefined}) => {
    if(data.avatar) return setState({...state, avatar: data.avatar, step: 3});
    if(data.next) setState({...state, step: 4});
  }
  const PhoneCallback = async (data: {next: boolean, phone?: string}) => {
    if(data.phone) return  setState({...state, phone: data.phone, step: 4});
    if(data.next){

    }
  }
  const EmailCallback = async (data: {next: boolean, email: string, password: string}) => {
    if(data.email || data.password){
      return  setState({...state, email: data.email, password: data.password, step: 4});
    }
    if(data.next) requestToServer();
  }
  const CodeCallback = (data: {next: boolean, code?: number}) => {
    if(state.id) CodeConfirmed({id: state.id, code: String(data.code)}).then((token) => {
      Cookies.set('token', token.access_token)
      router.push("/hall");
    });
    if(data.next) requestToServer();
  }

  const requestToServer = (): void => {
    createForm().then((id: string) => {
      // setState({...state, id: id,  step: 5})
    });
  }

  const createForm = async (): Promise<string> => {
    const form = new FormData();
    if(state.id) form.append('id', state.id);
    if(state.email) form.append('email', state.email);
    if(state.password) form.append('password', state.password);
    if(state.username) form.append('username', state.username);
    if(state.avatar) form.append('avatar', state.avatar);
    if(state.phone) form.append('phone', state.phone);

    const reg = await RegUser(form);
    return reg
  }

  return (
    <div className={`flex flex-column align-center content-center flex-grow ${state.step === 4 ? '': 'flex-column'}`}>
      <div className={`flex justify-center flex-column ${style.steps__frame}`}>
        {state.step === 0 && <Welcome callback={WelcomeCallback} />}
        {state.step === 1 && <Import callback={ImportCallback}/>}
        {state.step === 2 && <People callback={PeopleCallback}/>}
        {state.step === 3 && <Photo callback={PhotoCallback}/>}
        {state.step === 4 && <Phone callback={PhoneCallback}/>}
        {state.step === 5 && <Code callback={CodeCallback}/>}
      </div>
      {state.step === 4 && <span className={style.steps__or}>or</span>}
      {state.step === 4 && <div className={`flex justify-center flex-column ${style.steps__frame}`}>
        <Email callback={EmailCallback}/>
      </div>}
    </div>
  )
}

export default StepsAuth;