import React, {FC} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";

interface ICode {
  callback(e: React.MouseEvent<HTMLButtonElement>): void,
}

const Code: FC<ICode> = ({callback}) => {

  const ActiveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback(e)
  }

  const ChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
  }

  return(
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__code}`}>Enter your active code!</h3>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <input
          type="text"
          name="one"
          className={style.steps__input_number}
          placeholder="_"
          maxLength={1}
          onChange={ChangeNumber}
        />
        <input
          type="text"
          name="two"
          className={style.steps__input_number}
          placeholder="_"
          maxLength={1}
          onChange={ChangeNumber}
        />
        <input
          type="text"
          name="three"
          className={style.steps__input_number}
          placeholder="_"
          maxLength={1}
          onChange={ChangeNumber}
        />
        <input
          type="text"
          name="four"
          className={style.steps__input_number}
          placeholder="_"
          maxLength={1}
          onChange={ChangeNumber}
        />
      </div>
      <div className="flex justify-center">
        <Button name="Confirmed" callback={ActiveClick}/>
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <Link href="/trycode">
          <a className={`${style.steps__anchor}`}>Try entering your code</a>
        </Link>
      </div>
    </>
  )
}

export default Code;