import React, {useEffect, useRef, useState} from "react";
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
import Peer, {} from "simple-peer";
import SocketIO from "../../helpers/socket";

interface IRoomPage {
  rooms: IRoom,
}

interface IState {
  owner: boolean,
  room: IRoom,
}

const Room: NextPage<IRoomPage> = ({room, user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ownCheck = room.speaker.some((profile: IUser) => profile.id === user.id);
  const route = useRouter();
  const [state, setState] = useState({room, owner: ownCheck} as IState);

  const RemoveRoom = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if(state.owner) await DeleteRoom(room.id).then( (res: boolean) => {
      if(res){
        route.push('/hall');
        SocketIO.emit('deleteRoom', {room: room.id})
      }
    })
  }

  const AppendUser = (speaker: any) => {
    setState({...state, room: {...state.room, speaker: speaker}})
  }

  useEffect(() => {
    if(window !== undefined){
      SocketIO.emit('joinRoom',{room: room.id}, AppendUser);
      SocketIO.on('listenUser', AppendUser);
      SocketIO.on('deleteRoom', () => route.push('/hall'));
      return () => {
        SocketIO.emit('leaveRoom',{room: room.id});
        SocketIO.removeAllListeners();
      }
    }
  },[]);



  const inputOfferRef = useRef<any>(null)
  const inputAnswerRef = useRef<any>(null)

  const ownPeerRef = useRef<any>(null)
  const anyPeerRef = useRef<any>(null)

  const audioRef = useRef<any>(null)



  const offerSignal = () => {
    const input = inputOfferRef.current;
    const obj = JSON.parse(input.value)
    anyPeerRef.current.signal(obj)
  }

  const  anwerSignal = () => {
    const input = inputAnswerRef.current;
    const obj = JSON.parse(input.value)
    ownPeerRef.current.signal(obj)
  }

  useEffect(() => {

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream: any) => {
      console.log(stream)
    }).catch((err) => {console.log(err)})

    if (!Peer.WEBRTC_SUPPORT || window === undefined ) return

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(addMedia).catch((err) => {console.log(err)})

    function addMedia (stream: any) {
      stream.getTracks().forEach((track: any) => track.stop());

      ownPeerRef.current = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      })
      anyPeerRef.current = new Peer({
        initiator: false,
        trickle: false,
      })

      ownPeerRef.current.on('signal', (data: any) => {
        console.log(JSON.stringify(data));
      })

      anyPeerRef.current.on('signal', (data: any) => {
        console.log(JSON.stringify(data));
      })


      anyPeerRef.current.on('connect', () => {
        console.log('connect')
      })

      ownPeerRef.current.on('connect', () => {
        console.log('connect')
      })


      // anyPeerRef.current.on('stream', (stream: any) => {
      //   console.log(stream)
      // })

      // ownPeerRef.current.on('stream', (stream: any) => {
      //   console.log(stream)
      // })
    }

  },[])


  return (
    <BaseWrapper title={room.title} description={`weclcome to room page ${room.title}`} userContext={user}>
      <div className={`flex flex-column ${style.room}`}>
        <div className={`${style.room__title} flex justify-space-between`}>
          <h4 className={style.room__h4}>{room.title}</h4>
          <div>
            {state.owner && <Button classes={style.room__delete} name={'Delete room'} callback={RemoveRoom} color={'red'}/>}
          </div>
        </div>
        <ListSpeakers {...state.room}/>
        <div className={style.room__speak_media}>
          {/*{state.stream && state.stream.map((streem: any, i: number) => {*/}
          {/*  return <video key = {`video-${i}`} src = { window.URL.createObjectURL(streem)} autoPlay={true} />*/}
          {/*})}*/}
          <div ref={audioRef}>
            <input ref={inputOfferRef} type={'text'} name={'offer'}/>
            <button onClick={offerSignal}>Set Offer</button>

            <input ref={inputAnswerRef} type={'text'} name={'answerl'}/>
            <button onClick={anwerSignal}>Set Anser</button>
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = RoomServerSideProps;

export default Room;