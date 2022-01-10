import React, {FC} from "react";
import Link from 'next/link'
import Button from "../button";
import style from "./steps.auth.module.scss";

interface IWelcome {
  callback(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Welcome: FC<IWelcome> = ({callback}) => {

  return (
    <>
      <div className="flex justify-center">
        <h3 className={`${style.steps__h3} ${style.steps__welcome}`}>Welcome to Clubhouse!</h3>
      </div>
      <div className={`${style.steps__content}`}>
        <span className={`${style.steps__span}`}>
          We`re working hard to get Clubhouse ready for everyone! While we wrap up the finishing youches, we`re adding people gradually to make sure notheng breaks :)
        </span>
      </div>
      <div className="flex justify-center">
        <Button name="Get your username" callback={callback}/>
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <Link href="/invite">
          <a className={`${style.steps__anchor}`}>Havean ivite text?</a>
        </Link>
        <Link href="/signin">
          <a className={`${style.steps__anchor}`}>Sign in</a>
        </Link>
      </div>
    </>
  )
}

export default Welcome;