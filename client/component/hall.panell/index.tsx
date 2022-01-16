import React, {FC, useState} from "react";
import style from "./hall.panell.module.scss";
import Button from "../button";
import PopupRoom from "../popup.room/indes";

interface IHallPanell {
  title: string;
}

const HallPanell: FC<IHallPanell> = ({title}) => {
  const [popup, setPopup] = useState<boolean>(true);

  const ClickCreateRoom = (e: React.MouseEvent<HTMLButtonElement>): void => setPopup(true);
  const ClickClosePopupRoom = (): void => setPopup(false);

  return (
    <>
      {popup && <PopupRoom callback={ClickClosePopupRoom}/>}
      <div className={`flex justify-space-between align-center ${style.hall_panell}`}>
        <h5 className={style.hall_panell__h5}>{title}</h5>
        <div>
          <Button name={"Start a room"} callback={ClickCreateRoom} color={'green'}/>
        </div>
      </div>
    </>
  )
};

export default HallPanell;