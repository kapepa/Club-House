import React, {FC} from "react";
import style from "./input.module.scss";

interface IInput {
  type: string,
  name: string,
  placeholder: string,
  styleClass?: string | undefined,
  callback(e: React.ChangeEvent<HTMLInputElement>): void,
}

const Input: FC<IInput> = ({type, name, placeholder, callback, styleClass}) => {
  return (
    <input
      className={`${style.input} ${styleClass ? styleClass: ''}`}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={callback}
    />
  )
}

export default Input;