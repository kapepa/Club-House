import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import {InferGetServerSidePropsType, NextPage} from "next";
import style from "./room.module.scss";
import BaseWrapper from "../../layout/base.wrapper";
import ListSpeakers from "../../component/list.speakers";
import {RoomServerSideProps} from "./server.props";
import {IRoom} from "../../dto/room.dto";
import Button from "../../component/button";
import {IUser} from "../../dto/user.dto";
import {DeleteRoom} from "../../helpers/request";

interface IRoomPage {
  rooms: IRoom,
}

interface IState {
  owner: boolean
}

const Room: NextPage<IRoomPage> = ({room, user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const route = useRouter();
  const [state, setState] = useState({} as IState)

  const RemoveRoom = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if(state.owner) await DeleteRoom(room.id).then( (res: boolean) => {
      if(res) route.push('/hall');
    })
  }

  useEffect(() => {
    const ownCheck = room.speaker.some((profile: IUser) => profile.id === user.id);
    setState({...state, owner: ownCheck})
  },[]);

  return (
    <BaseWrapper title={room.title} description={`weclcome to room page ${room.title}`} userContext={user}>
      <div className={`flex flex-column ${style.room}`}>
        <div className={`${style.room__title} flex justify-space-between`}>
          <h4 className={style.room__h4}>{room.title}</h4>
          <div>
            {state.owner && <Button classes={style.room__delete} name={'Delete room'} callback={RemoveRoom} color={'red'}/>}
          </div>
        </div>
        <ListSpeakers {...room}/>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = RoomServerSideProps;

export default Room;