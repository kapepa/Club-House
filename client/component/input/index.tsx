import React, {FC} from "react";
import style from "./input.module.scss";

interface IInput {
  min?: number | undefined,
  max?: number | undefined,
  value?: string,
  type: string,
  name: string,
  placeholder: string,
  classes?: string | undefined,
  callback(e: React.ChangeEvent<HTMLInputElement>): void,
}

const Input: FC<IInput> = ({type, name, placeholder, callback, classes, value, min}) => {
  return (
    <input
      className={`${style.input} ${classes ? classes: ''}`}
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={callback}
      defaultValue={value ? value : ''}
      min={min}
    />
  )
}

export default Input;