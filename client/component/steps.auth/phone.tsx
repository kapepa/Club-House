import React, {FC, useState} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";
import InputPhone from "../input.phone";
import Regexp from "../../helpers/regexp";

interface ICallback {
  next: boolean,
  phone?: string | undefined,
}

interface IPhone {
  callback(data:ICallback): void
}

const Phone: FC<IPhone> = ({ callback }) => {
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const ConfirmedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback({next: true})
  }

  const PhoneChange = (data: {formattedValue: string}) => {
    const { formattedValue } = data;
    setPhone(formattedValue);
    callback({next: false, phone: formattedValue})
  }

  const ValidPhone = (phone: string | undefined): boolean => phone ? !Regexp.phone.test(phone) : true;

  return (
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__phone}`}>Enter your phone!</h3>
        <span className={`${style.steps__span}`}>
          We will send confirmation code!
        </span>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <InputPhone callback={ PhoneChange } />
      </div>
      <div className="flex justify-center">
        <Button name="Confirmed" callback={ ConfirmedClick } disabled={ ValidPhone(phone) }/>
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <Link href="/trystill">
          <a className={`${style.steps__anchor}`}>Try entering your number</a>
        </Link>
      </div>
    </>
  )
}

export default Phone;