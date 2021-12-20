import React, {FC} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";
import InputPhone from "../input.phone";

interface IPhone {
  callback(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Phone: FC<IPhone> = ({callback}) => {

  const ConfirmedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback(e)
  }

  const PhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
  }

  return (
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__phone}`}>Enter your phone!</h3>
        <span className={`${style.steps__span}`}>
          We will send confirmation code!
        </span>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <InputPhone callback={PhoneChange} />
      </div>
      <div className="flex justify-center">
        <Button name="Confirmed" callback={ConfirmedClick}/>
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