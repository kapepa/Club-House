import React, {FC, useState, useContext} from 'react';
import style from './steps.auth.module.scss';
import Button from "../button";
import Link from "next/link";
import Input from "../input";
import Regexp from "../../helpers/regexp";

interface ICallback {
  next: boolean,
  email?: string | undefined,
  password?: string | undefined,
}

interface IState {
  email: string |undefined,
  password: string | undefined,
  confirmed: string | undefined,
}

interface IEmail {
  emailPost: string | undefined,
  password: string | undefined,
  callback(data: ICallback): void;
}

const Email: FC<IEmail> = ({callback, emailPost, password}) => {
  const [state, setState] = useState<IState>({
    email: emailPost,
    password: password,
    confirmed: undefined,
  })

  const EmailClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    callback({next: true})
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(e.currentTarget.name === 'email') {
      setState({...state, email: e.currentTarget.value});
      callback({next: false, email: e.currentTarget.value, password: state.password})
    };
    if(e.currentTarget.name === 'password') {
      setState({...state, password: e.currentTarget.value})
      callback({next: false, email: state.email, password: e.currentTarget.value})
    };
    if(e.currentTarget.name === 'confirmed'){
      setState({...state, confirmed: e.currentTarget.value})
    };
  }

  const ValidUser = (user: IState): boolean => {
    if(!user.email || !user.password || (user.password !== user.confirmed)) return true;
    return !(Regexp.email.test(user.email) && Regexp.password.test(user.password));
  };

  return (
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__envelope}`}>Enter your Email!</h3>
        <span className={`${style.steps__span}`}>
          We will send confirmation code!
        </span>
      </div>
      <div className={`flex justify-center flex-column align-center ${style.steps__content}`}>
        <Input
          classes={style.steps__input_default}
          value={state.email}
          type={'string'}
          name={'email'}
          placeholder={'Enter your email'}
          callback={InputChange}
          min={6}
        />
        <Input
          classes={style.steps__input_default}
          value={state.password}
          type={'password'}
          name={'password'}
          placeholder={'Enter your password'}
          callback={InputChange}
          min={6}
        />
        <Input
          classes={style.steps__input_default}
          type={'password'}
          name={'confirmed'}
          placeholder={'Confirmed password'}
          callback={InputChange}
          min={6}
        />
      </div>
      <div className="flex justify-center">
        <Button name="Confirmed" callback={EmailClick} disabled={  ValidUser(state)  }
        />
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <Link href="/trystill">
          <a className={`${style.steps__anchor}`}>Try entering your number</a>
        </Link>
      </div>
    </>
  )
}

export default Email;