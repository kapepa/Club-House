import React, {FC} from "react";
import NumberFormat, {NumberFormatValues} from "react-number-format";
import style from "./input.phone.module.scss";

interface IInputPhone {
  callback(data: {formattedValue: string}): void
}

const InputPhone: FC<IInputPhone> = ({ callback }) => {
  return (
    <>
      <NumberFormat
        className={style.input_phone}
        format="+38 (###) ###-##-##"
        allowEmptyFormatting mask="_"
        onValueChange={callback}
      />
    </>
  )
}

export default InputPhone;