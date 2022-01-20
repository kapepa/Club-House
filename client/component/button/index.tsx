import React, {FC} from "react";
import style from "./button.module.scss";

enum BtnStyle {
  blue = "blue",
  green = "green",
  red = "red",
  frame = "frame",
}

interface IButton {
  color? : keyof typeof BtnStyle,
  name: string,
  alias?: string
  disabled?: boolean,
  classes?: string,
  callback(e: React.MouseEvent<HTMLButtonElement | HTMLImageElement> | React.ChangeEvent<HTMLInputElement>): void,
}

const Button: FC<IButton> = ({name, callback, disabled = false, color,alias, classes}) => {
  return (
    <button
      onClick={callback}
      name={alias}
      className={`
        ${style.btn} 
        ${color === "blue" || color === undefined? style.btn__blue : ''}
        ${color === "frame"? style.btn__frame : ''}
        ${color === "green"? style.btn__green : ''}
        ${color === "red"? style.btn__red : ''}
        ${disabled ? style.btn__disabled : ''}
        ${classes ? classes : ''}
       `}
      disabled={disabled}
    >{name}</button>
  )
};

export default Button;