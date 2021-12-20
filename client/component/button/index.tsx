import React, {FC} from "react";
import style from "./button.module.scss";

interface IButton {
  name: string,
  callback(e: React.MouseEvent<HTMLButtonElement>): void,
}

const Button: FC<IButton> = ({name, callback}) => {
  return (
    <button onClick={callback} className={`${style.btn}`}>{name}</button>
  )
}

export default Button;