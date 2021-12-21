import React, {FC} from "react";
import NumberFormat from "react-number-format";
import style from "./input.phone.module.scss";

interface IInputPhone {
  callback(e: React.ChangeEvent<HTMLInputElement>): void,
}

const InputPhone: FC<IInputPhone> = ({ callback }) => {
  return (
    <>
      <input
        className={style.input_phone}
        placeholder='+38 (063) ___-__-__'
        name="phone"
        type="text"
        onChange={callback}
      />
    </>
  )
}

export default InputPhone;