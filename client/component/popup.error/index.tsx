import React, {FC, HTMLAttributes} from 'react';
import style from './popup.error.module.scss';
import Button from "../button";

interface IPopupError{
  message: string | undefined,
  callback(): void,
}

const PopupError: FC<IPopupError> = ({message, callback}) => {

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    const data = (e.target as HTMLDivElement).dataset;
    if(data.hasOwnProperty('close')) callback();
  }

  return (
    <div
      className={`${style.popup_error} popup flex content-center align-center`}
      onClick={closePopup}
      data-close={true}
    >
      <div className={`${style.popup_error__area} popup__area flex flex-column align-center`}>
        <div
          className={`popup__x pointer`}
          onClick={closePopup}
          data-close={true}
        />
        <div className={style.popup_error__cap}>Warning</div>
        <div className={style.popup_error__content}>{message}</div>
        <Button name={'OK'} callback={callback} />
      </div>
    </div>
  )
}

export default PopupError;