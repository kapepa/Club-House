import React, {FC, useContext, useState} from 'react';
import style from './popup.login.module.scss';
import Button from "../button";
import Input from "../input";
import { WarningContext } from '../../layout/base.wrapper';
import Regexp from "../../helpers/regexp";
import { LoginUser } from "../../helpers/request";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface IPopupLogin {
  callback(): void,
}

interface IState{
  login: string,
  password: string,
}

const PopupLogin: FC<IPopupLogin> = ({callback}) => {
  const router = useRouter();
  const popupWarning = useContext(WarningContext)
  const [state, setState] = useState<IState>({} as IState)

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    const data = (e.target as HTMLDivElement).dataset;
    if(data.hasOwnProperty('close')) callback();
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'login') setState({...state, login: e.target.value})
    if(e.target.name === 'password') setState({...state, password: e.target.value})
  }

  const checkPhoneNumber = (number: string): {verification: boolean, phone: string | undefined} => {
    const extractDigit = number.replace(/\D/g, "").split('');
    const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, ...other] = extractDigit;
    const toPhoneStr = `${d1}${d2} (${d3}${d4}${d5}) ${d6}${d7}${d8}-${d9}${d10}-${d11}${d12}`;

    return {verification: (Regexp.phone.test(toPhoneStr) && other.length === 0), phone: toPhoneStr.toString()};
  }

  const clickLogin = async (): Promise<void> => {
    const dublicate = JSON.parse(JSON.stringify({...state, field: 'email'}))
    const { verification, phone } = checkPhoneNumber(dublicate.login);

    if(verification){
      dublicate.login = phone;
      dublicate.field = 'phone';
    }
    if(!(Regexp.email.test(state.login) || verification)) popupWarning('Please entering login');
    if(!Regexp.password.test(state.password)) popupWarning('Please entering password');

    await LoginUser(dublicate).then((res: {access_token?: string, message: string, error: boolean}): void => {
      if(res.error) return  popupWarning(res.message);
      if(!res.error && res.access_token){
        router.push('/hall')
        Cookies.set('token', res.access_token)
        callback();
      }
    })
  }

  return (
    <div
      className={`${style.popup_login} popup flex content-center align-center`}
      onClick={closePopup}
      data-close={true}
    >
      <div className={`${style.popup_login__area}  popup__area flex flex-column align-center`}>
        <div
          className={`popup__x pointer`}
          onClick={closePopup}
          data-close={true}
        />
        <div className={style.popup_login__cap}>Login</div>
        <div className={`${style.popup_login__content} flex flex-column`}>
          <Input
            type={'text'}
            name={'login'}
            placeholder={'Enter email or phone'}
            callback={InputChange}
            classes={style.popup_login__input}
          />
          <Input
            type={'password'}
            name={'password'}
            placeholder={'Enter password'}
            callback={InputChange}
            classes={style.popup_login__input}
          />
        </div>
        <Button name={'OK'} callback={clickLogin} />
      </div>
    </div>
  )
}

export default PopupLogin