import React, {FC, useState} from "react";
import { useRouter } from 'next/router'
import style from "./popup.room.module.scss";
import Input from "../input";
import Button from "../button";
import Regexp from "../../helpers/regexp";
import {CreateRoom} from "../../helpers/request";

interface IPopupRoom {
  callback(): void,
}

enum EType {
  open, social, closed,
}

interface IState {
  title: string,
  type: keyof typeof EType,
}

const PopupRoom: FC<IPopupRoom> = ({callback}) => {
  const router = useRouter();
  const [state, setState] = useState<IState>({} as IState);
  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    const data = (e.target as HTMLDivElement).dataset;
    if(data.hasOwnProperty('close')) callback();
  }

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'name') setState({...state, title: e.target.value})
  }

  const clickCreate = (e: React.MouseEvent<HTMLButtonElement>): void => {
    CreateRoom(state).then((idRoom: string) => {
      router.push(`/room/${idRoom}`)
    })
  }

  return (
    <div
      className={`popup flex content-center align-center`}
      onClick={closePopup}
      data-close={true}
    >
      <div className={`${style.popup_room__area} popup__area flex flex-column align-center`}>
        <div
          className={`popup__x`}
          onClick={closePopup}
          data-close={true}
        />
        <div className={style.popup_room__cap}>Topic</div>
        <div className={`${style.popup_room__content} flex flex-column`}>
          <Input
            type={'text'}
            name={'name'}
            placeholder={'Enter the topic to be discussed'}
            callback={InputChange}
            classes={style.popup_room__input}
          />
        </div>
        <span className={`${style.popup_room__type}`}>Room type</span>
        <div className={`${style.popup_room__choice} flex justify-space-between`}>
          <div
            className={`
              ${ style.popup_room__options }
              ${ style.popup_room__earth }
              ${ !state.type || state.type === 'open' ? style.popup_room__active : ''} 
              flex-grow`
            }
            onClick={() => setState({...state, type: 'open'})}
          >Open</div>
          <div
            className={`
              ${ style.popup_room__options } 
              ${ style.popup_room__sociable }
              ${ state.type === 'social' ? style.popup_room__active : ''} 
              flex-grow`
            }
            onClick={() => setState({...state, type: 'social'})}
          >Social</div>
          <div
            className={`
              ${ style.popup_room__options } 
              ${ style.popup_room__lock }
              ${ state.type === 'closed' ? style.popup_room__active : ''} 
              flex-grow`
            }
            onClick={() => setState({...state, type: 'closed'})}
          >Closed</div>
        </div>
        <span className={`${style.popup_room__start}`}>Start a room open to everyone</span>
        <Button name={`Let's go`} callback={clickCreate} color={'green'} disabled={!Regexp.title.test(state.title)}/>
      </div>
    </div>
  )
}

export default PopupRoom;