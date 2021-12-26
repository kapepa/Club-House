import React from "react";
import style from "./hall.module.scss";
import { InferGetServerSidePropsType, NextPage} from "next";
import BaseWrapper from "../../layout/base.wrapper";
import HallPanell from "../../component/hall.panell";
import RoomCard from "../../component/room.card";
import { IRoom } from "../../dto/room";
import { HallServerSideProps } from './server.props';

interface IHall {
  rooms: IRoom
}

const Hall: NextPage<IHall> = ({rooms}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseWrapper title={"Hall"} description={"weclcome to hall page"} isHall={true}>
      <HallPanell title={"Hall"}/>
      <div className={`${style.hall__content}`}>
        {rooms.map((room: IRoom, i: number) => <RoomCard key={room.id + i} {...room} />)}
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = HallServerSideProps;

export default Hall;