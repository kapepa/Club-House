import React, {FC} from "react";
import Avatar from "../avatar";
import style from "./login.module.scss";

const Login: FC = () => {
  return(
    <div className={`flex align-center`}>
      <span className={style.login__span}>Login</span>
      <Avatar/>
    </div>
  )
}

export default Login;