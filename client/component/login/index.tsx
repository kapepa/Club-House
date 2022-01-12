import React, {FC, useState} from "react";
import Avatar from "../avatar";
import style from "./login.module.scss";
import PopupLogin from "../popup.login";

interface IState {
  popup: boolean
}

const Login: FC = () => {
  const [state, setState] = useState<IState>({
    popup: false,
  })

  return(
    <>
      <div onClick={() => setState({...state, popup: true})} className={`flex align-center pointer`}>
        <span className={style.login__span}>Login</span>
        <Avatar/>
      </div>
      {state.popup && <PopupLogin callback={() => {setState({...state, popup: false})}}/>}
    </>
  )
}

export default Login;