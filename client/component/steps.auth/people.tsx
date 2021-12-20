import React, {FC} from "react";
import style from "./steps.auth.module.scss";;
import Button from "../button";
import Input from "../input";

interface IPeople {
  callback(e: React.MouseEvent<HTMLButtonElement>): void;
}

const People: FC<IPeople> = ({callback}) => {

  const NextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback(e)
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__people}`}>What's your full name?</h3>
        <span className={`${style.steps__span}`}>
          People real names on Clubhouse : )
        </span>
        <span className={`${style.steps__span}`}>
          Thnx!
        </span>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <Input callback={InputChange} name="name" type="text" placeholder="Your Name"/>
      </div>
      <div className="flex justify-center">
        <Button name="Next" callback={NextClick}/>
      </div>
    </>
  )
}

export default People;