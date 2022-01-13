import React, {FC, useContext, useState} from "react";
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
import NavDot from "../nav.dot";
import {WarningContext} from "../../layout/base.wrapper";

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
  const warningPopUp = useContext(WarningContext);
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
  const ImportCallback = (data: {next: boolean, profile: {id: string, username: string, avatar: string, phone: string}}) => {
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
  const PhoneCallback = async (data: {next: boolean, phone: string, password: string}) => {
    if(data.phone || data.password){
      return  setState({...state, phone: data.phone, password: data.password, step: 4});
    }
    if(data.next) requestToServer();
  }
  const EmailCallback = async (data: {next: boolean, email: string, password: string}) => {
    if(data.email || data.password){
      return  setState({...state, email: data.email, password: data.password, step: 4});
    }
    if(data.next) requestToServer();
  }
  const CodeCallback = (data: {next: boolean, code?: number}) => {
    if(state.id) CodeConfirmed({id: state.id, code: String(data.code)}).then((res:{
      access_token?: string; message: string; error: boolean
    }) => {
      if(res.error) return warningPopUp(res.message);

      if(!res.error && res.access_token){
        Cookies.set('token', res.access_token)
        router.push("/hall");
      }
    });
  }

  const requestToServer = (): void => {
    createForm().then((data: { id: string | undefined; message: string; error: boolean }) => {
      if (!data.error) setState({...state, id: data.id, step: 5})
      if(data.error) warningPopUp(data.message)
    });
  }

  const checkRequiredField = ():{ error: boolean, message: string} => {
    let template = { error: false, message: ''};
    if(!state.username?.length) {
      template = {error: true, message: 'Fill in the Username field '};
      setState({...state, step: 2});
    }
    if(!state.phone?.length && !state.email?.length) {
      template = {error: true, message: 'Fill in the phone or email field '};
      setState({...state, step: 4});
    }
    return template;
  }

  const createForm = async (): Promise<{ id: string | undefined; message: string; error: boolean }> => {
    const check = checkRequiredField();
    if(check.error) return { id: undefined, message: check.message, error: check.error }

    const form = new FormData();
    if(state.id) form.append('id', state.id);
    if(state.email) form.append('email', state.email);
    if(state.password) form.append('password', state.password);
    if(state.username) form.append('username', state.username);
    if(state.phone) form.append('phone', state.phone);

    state.avatar ? form.append('avatar', state.avatar) : form.append('avatar', '') ;

    const reg = await RegUser(form);
    return reg
  }

  return (
    <div className={`flex flex-column align-center content-center flex-grow ${state.step === 4 ? '': 'flex-column'}`}>
      <div className={`${style.steps__area} flex flex-column flex-grow`}>
        <div className={`flex flex-column flex-grow justify-center`}>
          <div className={`flex justify-center flex-column ${style.steps__frame}`}>
            {state.step === 0 && <Welcome callback={WelcomeCallback} />}
            {state.step === 1 && <Import callback={ImportCallback}/>}
            {state.step === 2 && <People callback={PeopleCallback} username = {state.username}/>}
            {state.step === 3 && <Photo callback={PhotoCallback} avatarImage = {state.avatar}/>}
            {state.step === 4 && <Phone callback={PhoneCallback} phoneNumber = { state.phone } password={state.phone ? state.password : undefined}/>}
            {state.step === 5 && <Code callback={CodeCallback}/>}
          </div>
          {state.step === 4 && <span className={style.steps__or}>or</span>}
          {state.step === 4 && <div className={`flex justify-center flex-column ${style.steps__frame}`}>
            <Email callback={EmailCallback} emailPost = {state.email} password={state.email?.length ? state.password : undefined}/>
          </div>}
        </div>
        <NavDot
          activeDot={state.step}
          maxDot={6}
          callback={(dot: number) => {setState({...state, step: dot})}}
          postion={'column'}
          classes={`${style.steps__dots}`}
        />
      </div>
    </div>
  )
}

export default StepsAuth;