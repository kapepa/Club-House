import React, {FC} from "react";
import style from "./list.speakers.module.scss";
import Avatar from "../avatar";

const ListSpeakers: FC = () => {
  return (
    <div className={`flex flex-wrap ${style.list_speakers__speakers}`}>
      <div className={`flex flex-column justify-center`}>
        <div className={`flex justify-center`}>
          <Avatar />
        </div>
        <div className={style.list_speakers__name}>
          <span>speakers name</span>
        </div>
      </div>
    </div>
  )
}

export default ListSpeakers;