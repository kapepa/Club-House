import React, {FC, useState} from 'react';
import style from './popup.login.module.scss';
import Button from "../button";
import Input from "../input";

interface IPopupLogin {
  callback(): void,
}

interface IState{
  login: string,
  password: string,
}

const PopupLogin: FC<IPopupLogin> = ({callback}) => {
  const [state, setState] = useState<IState>({} as IState)

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    const data = (e.target as HTMLDivElement).dataset;
    if(data.hasOwnProperty('close')) callback();
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name)
  }

  return (
    <div className={`${style.popup_login} popup flex content-center align-center`}>
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
            placeholder={'Enter username or phone'}
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
        <Button name={'OK'} callback={() => {}} />
      </div>
    </div>
  )
}

export default PopupLogin