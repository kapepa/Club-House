import React, {FC} from "react";
import { useRouter } from "next/router";
import style from "./room.card.module.scss";
import { IRoom } from "../../dto/room.dto";
import Avatar from "../avatar";


const RoomCard: FC<IRoom> = ({id,title, message, people, speaker}) => {
  const router = useRouter();
  return (
    <div
      className={`pointer ${style.room_card}`}
      onClick={() => router.push(`/room/${id}`)}
    >
      <div className={`h100 ${style.room_card__frame}`}>
        <h4>{title}</h4>
        <div className="flex">
          <div className={`flex flex-column ${style.room_card__avatar}`}>
            {speaker.map((user: {avatar: string}, i: number) => <Avatar key={user.avatar + i} size={30} url={user.avatar} className={style.room_card__image} />)}
          </div>
          <div className={`flex flex-column ${style.room_card__desc}`}>
            <div className={`flex flex-column ${style.room_card__name}`}>
              {speaker.map((user: {username: string}, i: number) => <span key={user.username + i} className={style.room_card__speaker} >{user.username}</span>)}
            </div>
            <div className={`flex`}>
              <div className={`${style.room_card__icon} ${style.room_card__people}`}>{people}</div>
              <div className={`${style.room_card__icon} ${style.room_card__message}`}>{message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCard;