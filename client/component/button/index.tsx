import React, {FC} from "react";
import style from "./button.module.scss";

interface IButton {
  name: string,
  disabled?: boolean,
  callback(e: React.MouseEvent<HTMLButtonElement>): void,
}

const Button: FC<IButton> = ({name, callback, disabled = false}) => {
  return (
    <button
      onClick={callback}
      className={`${style.btn} ${disabled ? style.btn__disabled : ''}`}
      disabled={disabled}
    >{name}</button>
  )
}

export default Button;