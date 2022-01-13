import React, {FC, useState, useContext} from "react";
import { useRouter } from "next/router"
import Avatar from "../avatar";
import style from "./login.module.scss";
import PopupLogin from "../popup.login";
import {UserContext} from "../../layout/base.wrapper";

interface IState {
  popup: boolean
}

const Login: FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [state, setState] = useState<IState>({
    popup: false,
  })

  const loginClick = (e: React.MouseEvent<HTMLElement>): void => {
    if(!userContext) setState({...state, popup: state.popup ? false : true})
    if(userContext?.id) router.push('/profile');
  }

  return(
    <>
      <div onClick={loginClick} className={`flex align-center pointer`}>
        <span className={style.login__span}>{`${userContext?.id ? userContext.username : 'Login'}`}</span>
        <Avatar url={userContext?.avatar}/>
      </div>
      {state.popup && <PopupLogin callback={() => {setState({...state, popup: false})}}/>}
    </>
  )
}

export default Login;