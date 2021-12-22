import React, {FC} from "react";
import Avatar from "../avatar";
import style from "./login.module.scss";
import {useRouter} from "next/router";

const Login: FC = () => {
  const route = useRouter();

  return(
    <div onClick={() => route.push("/profile")} className={`flex align-center pointer`}>
      <span className={style.login__span}>Login</span>
      <Avatar/>
    </div>
  )
}

export default Login;