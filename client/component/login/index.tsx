import React, {FC, useState} from "react";
import Avatar from "../avatar";
import style from "./login.module.scss";
import {useRouter} from "next/router";
import PopupLogin from "../popup.login";

interface IState {
  popup: boolean
}

const Login: FC = () => {
  const [state, setState] = useState<IState>({
    popup: true,
  })
  const route = useRouter();

  return(
    <>
      <div onClick={() => route.push("/profile")} className={`flex align-center pointer`}>
        <span className={style.login__span}>Login</span>
        <Avatar/>
      </div>
      {state.popup && <PopupLogin callback={() => {setState({...state, popup: false})}}/>}
    </>
  )
}

export default Login;