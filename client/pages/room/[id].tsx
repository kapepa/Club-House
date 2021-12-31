import React from "react";
import {InferGetServerSidePropsType, NextPage} from "next";
import style from "./room.module.scss";
import BaseWrapper from "../../layout/base.wrapper";
import ListSpeakers from "../../component/list.speakers";
import {RoomServerSideProps} from "./server.props";
import {IRoom} from "../../dto/room";

interface IRoomPage {
  rooms: IRoom,
};

const Room: NextPage<IRoomPage> = ({room}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(room)
  return (
    <BaseWrapper title={room.title} description={`weclcome to room page ${room.title}`}>
      <div className={`flex flex-column ${style.room}`}>
        <div className={style.room__title}>
          <h4 className={style.room__h4}>{room.title}</h4>
        </div>
        <ListSpeakers {...room}/>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = RoomServerSideProps;

export default Room;