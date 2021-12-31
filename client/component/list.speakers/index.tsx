import React, {FC} from "react";
import style from "./list.speakers.module.scss";
import Avatar from "../avatar";
import {IRoom} from "../../dto/room";

const ListSpeakers: FC<IRoom> = ({speaker}) => {
  return (
    <div className={`flex flex-wrap ${style.list_speakers__speakers}`}>
      {
        speaker.map((user: {username: string, avatar: string}, i :number) => {
          return (
            <div key={user.username + i} className={`flex flex-column justify-center ${style.list_speakers__frame}`}>
              <div className={`flex justify-center`}>
                <Avatar />
              </div>
              <div className={style.list_speakers__name}>
                <span>{user.username}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
};

export default ListSpeakers;