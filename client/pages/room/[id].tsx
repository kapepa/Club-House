import React from "react";
import {NextPage} from "next";
import style from "./room.module.scss";
import BaseWrapper from "../../layout/base.wrapper";
import ListSpeakers from "../../component/list.speakers";

const Room: NextPage = () => {
  return (
    <BaseWrapper title={"Room"} description={"weclcome to room page"}>
      <div className={`flex flex-column ${style.room}`}>
        <div className={style.room__title}>
          <h4 className={style.room__h4}>Name Room</h4>
        </div>
        <ListSpeakers/>
      </div>
    </BaseWrapper>
  )
}

export default Room;