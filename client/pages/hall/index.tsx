import React, {useContext, useEffect} from "react";
import style from "../../component/hall.module.scss";
import { InferGetServerSidePropsType, NextPage} from "next";
import BaseWrapper, {UserContext} from "../../layout/base.wrapper";
import HallPanell from "../../component/hall.panell";
import RoomCard from "../../component/room.card";
import { IRoom } from "../../dto/room.dto";
import { HallServerSideProps } from './server.props';
import {IUser} from "../../dto/user.dto";
import {io} from "socket.io-client";
import {config} from "../../config";

interface IHall {
  rooms: IRoom,
  user: IUser,
}

const Hall: NextPage<IHall> = ({rooms, user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


  useEffect(() => {

    // if( window !== undefined ){
    //   const socket = io("http://localhost:8080");
    //   socket.on("connect", () => {
    //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    //   });
    // }

  },[])

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