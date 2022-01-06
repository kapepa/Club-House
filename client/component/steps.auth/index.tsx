import React, {FC, useEffect, useState} from "react";
import { useRouter } from 'next/router'
import style from "./steps.auth.module.scss";
import Welcome from "./welcome";
import Import from "./import";
import People from "./people";
import Photo from "./photo";
import Phone from "./phone";
import Code from "./code";
import {RegUser} from "../../helpers/request";

interface IState {
  id?: string | undefined
  step: number;
  welcome: boolean;
  username: string | null;
  avatar: string | undefined | File;
  phone: string | undefined;
  code: number | undefined;
}

const StepsAuth: FC = () => {
  const router = useRouter()
  const [state, setState] = useState<IState>({
    step: 4,
    id: undefined,
    welcome: false,
    username: "TestName",
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
    if(data.username) return setState({...state, username: data.username, step: 3});
    if(data.next) setState({...state, step: 3});
  }
  const PhotoCallback = (data: {next: boolean, avatar?: File | string | undefined}) => {
    if(data.avatar) return setState({...state, avatar: data.avatar, step: 3});
    if(data.next) setState({...state, step: 4});
  }
  const PhoneCallback = async (data: {next: boolean, phone?: string}) => {
    // if(data.phone) return  setState({...state, avatar: data.phone, step: 4});
    if(data.next){
      await createForm();

      // setState({...state, step: 5});
      // const reg = await RegUser('hellow');
    }
  }
  const CodeCallback = (data: {next: boolean, code?: number}) => {
    //make request to server
    router.push("/hall");
  }

  const createForm = async (): Promise<string> => {
    const form = new FormData();
    if(state.id) form.append('id', state.id);
    if(state.username) form.append('username', state.username);
    if(state.avatar) form.append('avatar', state.avatar);
    if(state.phone) form.append('phone', state.phone);

    const reg = await RegUser(form);
    return reg
  }

  return (
    <div className={`flex flex-column align-center content-center flex-grow`}>
      <div className={`flex justify-center flex-column ${style.steps__frame}`}>
        {state.step === 0 && <Welcome callback={WelcomeCallback} />}
        {state.step === 1 && <Import callback={ImportCallback}/>}
        {state.step === 2 && <People callback={PeopleCallback}/>}
        {state.step === 3 && <Photo callback={PhotoCallback}/>}
        {state.step === 4 && <Phone callback={PhoneCallback}/>}
        {state.step === 5 && <Code callback={CodeCallback}/>}
      </div>
    </div>
  )
}

export default StepsAuth;