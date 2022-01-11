import React, {FC, useState} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";
import InputPhone from "../input.phone";
import Regexp from "../../helpers/regexp";
import Input from "../input";

interface ICallback {
  next: boolean,
  phone?: string | undefined,
  password?: string | undefined,
}

interface IPhone {
  password: string | undefined,
  phoneNumber: string | undefined,
  callback(data:ICallback): void
}

interface IState {
  phone: string | undefined,
  password: string | undefined,
  confirmed: string | undefined,
}

const Phone: FC<IPhone> = ({ callback, phoneNumber, password }) => {
  const [state, setState] = useState<IState>({
    phone: phoneNumber,
    password: password,
    confirmed: undefined,
  });
  const ConfirmedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback({next: true})
  }

  const PhoneChange = (data: {formattedValue: string}) => {
    const { formattedValue } = data;
    setState({...state, phone: formattedValue});
    callback({next: false, phone: formattedValue, password: state.password})
  }
  const InputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(e.currentTarget.name === 'password') {
      setState({...state, password: e.currentTarget.value})
      callback({next: false, password: e.currentTarget.value, phone: state.phone})
    };
    if(e.currentTarget.name === 'confirmed'){
      setState({...state, confirmed: e.currentTarget.value})
    };
  }

  const ValidPhone = (user: IState): boolean => {
    if(!user.phone || !user.password || (user.password !== user.confirmed)) return true;
    return !(Regexp.phone.test(user.phone) && Regexp.password.test(user.password));
  };

  return (
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__phone}`}>Enter your phone!</h3>
        <span className={`${style.steps__span}`}>
          We will send confirmation code!
        </span>
      </div>
      <div className={`flex justify-center flex-column align-center ${style.steps__content}`}>
        <InputPhone
          callback={ PhoneChange }
          value={state.phone}
          classes={style.steps__input_default}
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
        <Button name="Confirmed" callback={ ConfirmedClick } disabled={ ValidPhone(state) }/>
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