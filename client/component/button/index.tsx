import React, {FC} from "react";
import style from "./button.module.scss";

enum BtnStyle {
  blue = "blue",
  green = "green",
  frame = "frame",
}

interface IButton {
  color? : keyof typeof BtnStyle,
  name: string,
  alias?: string
  disabled?: boolean,
  callback(e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>): void,
}

const Button: FC<IButton> = ({name, callback, disabled = false, color,alias}) => {
  return (
    <button
      onClick={callback}
      name={alias}
      className={`
        ${style.btn} 
        ${color === "blue" || color === undefined? style.btn__blue : ''}
        ${color === "frame"? style.btn__frame : ''}
        ${color === "green"? style.btn__green : ''}
        ${disabled ? style.btn__disabled : ''}
       `}
      disabled={disabled}
    >{name}</button>
  )
};

export default Button;