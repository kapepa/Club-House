import React, {FC} from "react";
import style from "./input.module.scss";

interface IInput {
  type: string,
  name: string,
  placeholder: string,
  callback(e: React.ChangeEvent<HTMLInputElement>): void,
}

const Input: FC<IInput> = ({type, name, placeholder, callback}) => {
  return (
    <input
      className={`${style.input}`}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={callback}
    />
  )
}

export default Input;