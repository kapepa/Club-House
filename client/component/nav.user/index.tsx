import React, {FC} from "react";
import Logo from "../logo";
import Login from "../login";
import style from "./nav.user.module.scss"

const NavUser: FC = () => {
  return (
    <div className={`flex align-center justify-space-between ${style.nav_user}`}>
      <Logo/>
      <Login/>
    </div>
  )
}

export default NavUser;