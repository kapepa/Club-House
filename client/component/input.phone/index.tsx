import React, {FC} from "react";
import NumberFormat, {NumberFormatValues} from "react-number-format";
import style from "./input.phone.module.scss";

interface IInputPhone {
  callback(data: {formattedValue: string}): void
  value: string | undefined,
  classes?: string
}

const InputPhone: FC<IInputPhone> = ({ callback, value,classes }) => {
  return (
    <>
      <NumberFormat
        className={`${style.input_phone} ${classes ? classes : ''}`}
        format="38 (###) ###-##-##"
        allowEmptyFormatting mask="_"
        onValueChange={callback}
        defaultValue={value}
      />
    </>
  )
}

export default InputPhone;