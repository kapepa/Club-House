import React, {FC} from "react";
import style from "./hall.panell.module.scss";
import Button from "../button";

interface IHallPanell {
  title: string;
}

const HallPanell: FC<IHallPanell> = ({title}) => {
  const ClickCreateRoom = () => {

  }

  return (
    <div className={`flex justify-space-between align-center ${style.hall_panell}`}>
      <h5 className={style.hall_panell__h5}>{title}</h5>
      <div>
        <Button name={"Start a room"} callback={ClickCreateRoom} color={'green'}/>
      </div>
    </div>
  )
};

export default HallPanell;