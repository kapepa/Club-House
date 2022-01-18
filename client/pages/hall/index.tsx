import React, {useContext, useEffect} from "react";
import style from "../../component/hall.module.scss";
import { InferGetServerSidePropsType, NextPage} from "next";
import BaseWrapper, {UserContext} from "../../layout/base.wrapper";
import HallPanell from "../../component/hall.panell";
import RoomCard from "../../component/room.card";
import { IRoom } from "../../dto/room.dto";
import { HallServerSideProps } from './server.props';
import {IUser} from "../../dto/user.dto";

interface IHall {
  rooms: IRoom,
  user: IUser,
}

const Hall: NextPage<IHall> = ({rooms, user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseWrapper title={"Hall"} description={"weclcome to hall page"} isHall={true} userContext = {user}>
      <HallPanell title={"Hall"}/>
      <div className={`${style.hall__content}`}>
        {rooms.map((room: IRoom, i: number) => <RoomCard key={room.id + i} {...room} />)}
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = HallServerSideProps;

export default Hall;