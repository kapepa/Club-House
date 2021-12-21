import React, {FC, useState} from "react";
import style from "./steps.auth.module.scss";;
import Button from "../button";
import Input from "../input";
import Regexp from "../../helpers/regexp";

interface IPeople {
  callback(data: {next: boolean, name?: string}): void;
}

const People: FC<IPeople> = ({callback}) => {
  const [name, setName] = useState<string>('')

  const NextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback({next: true})
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value);
    callback({next: false, name: value})
  }

  const ValidName = (name: string): boolean => Regexp.name.test(name);

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
        <Button name="Next" callback={NextClick} disabled={ValidName(name) ? false : true}/>
      </div>
    </>
  )
}

export default People;