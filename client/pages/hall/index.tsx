import React, {useContext, useEffect, useState} from "react";
import { useRouter } from 'next/router'
import style from "../../component/hall.module.scss";
import { InferGetServerSidePropsType, NextPage} from "next";
import BaseWrapper, {UserContext} from "../../layout/base.wrapper";
import HallPanell from "../../component/hall.panell";
import RoomCard from "../../component/room.card";
import { IRoom } from "../../dto/room.dto";
import { HallServerSideProps } from './server.props';
import {IUser} from "../../dto/user.dto";
import SocketIO from "../../helpers/socket";
import {GetAllRooms} from "../../helpers/request";

interface IHall {
  rooms: IRoom,
  user: IUser,
}

interface IState {
  rooms: IRoom[]
}

const Hall: NextPage<IHall> = ({rooms, user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [state, setState] = useState<IState>({rooms});

  const PeopleCountRooms = async (data: {community: any, updateRooms: boolean}) => {
    const { community, updateRooms } = data;
    const copyRoom =  updateRooms ? await GetAllRooms() : JSON.parse(JSON.stringify(state.rooms));
    const updatePeople = copyRoom.map((room: IRoom) => {
      return community.hasOwnProperty(room.id) ? {...room, ...community[room.id]} : {...room}
    })
    setState({...state, rooms: updatePeople});
  }

  useEffect(() => {
    if(window !== undefined){
      SocketIO.emit('hall', PeopleCountRooms);
      SocketIO.on('peopleCountRooms', PeopleCountRooms);
      return () => {
        SocketIO.emit('leaveHall');
        SocketIO.removeAllListeners();
      }
    }
  },[])

  return (
    <BaseWrapper title={"Hall"} description={"weclcome to hall page"} isHall={true} userContext = {user}>
      <HallPanell title={"Hall"}/>
      <div className={`${style.hall__content}`}>
        {state.rooms.map((room: IRoom, i: number) => <RoomCard key={room.id + i} {...room} />)}
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = HallServerSideProps;

export default Hall;