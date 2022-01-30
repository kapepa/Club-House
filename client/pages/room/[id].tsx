import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
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
import Peer, { SimplePeer, SignalData } from "simple-peer";
import SocketIO from "../../helpers/socket";
import Media from "../../component/video";

interface IRoomPage {
  rooms: IRoom,
}

interface IState {
  owner: boolean,
  room: IRoom,
}

const Room: NextPage<IRoomPage> = ({room, user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const route = useRouter();
  const ownCheck = room.speaker.some((profile: IUser) => profile.id === user.id);
  const [state, setState] = useState({room, owner: ownCheck} as IState);
  const [media, setMedia] = useState<SimplePeer[]>([]);
  const signaPeerMap = useRef<Map<string, any>>(new Map());
  const streamRef = useRef<MediaStream | undefined>();

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

  // WebRTC start

  const createPeer = (initiator = false, id: string) => {
    const peer = new Peer({
      initiator: initiator,
      trickle: false,
      stream: streamRef.current,
    });

    peer.on('connect', () => {console.log('connect')});
    peer.on('error', (err) => { console.error(err) })
    peer.on('close', () => {
      signaPeerMap.current.delete( id )
      setMedia(Array.from(signaPeerMap.current.values()))
    })

    return peer;
  }

  const makePeer = (prop: { userId: string }) => {
    const peer = createPeer(true, prop.userId);
    peer.on('signal', (data: SignalData) => {
      SocketIO.emit('offerPeer', {signal: data, userId: prop.userId})
    })
    signaPeerMap.current.set( prop.userId, peer )
    setMedia(Array.from(signaPeerMap.current.values()))
  }

  const toPeer = (prop: { signal: SignalData, userId: string }) => {
    const peer = createPeer(false, prop.userId);
    peer.signal(prop.signal)
    peer.on('signal', (data: SignalData) => {
      SocketIO.emit('answerPeer', {signal: data, userId: prop.userId})
    })
    signaPeerMap.current.set(prop.userId, peer)
    setMedia(Array.from(signaPeerMap.current.values()))
  }

  const completePeer = (prop: { signal: SignalData, userId: string }) => {
    signaPeerMap.current.get(prop.userId).signal(prop.signal)
  }

  // WebRTC end

  useEffect(() => {
    if(window !== undefined){
      SocketIO.emit('joinRoom',{room: room.id}, AppendUser);
      SocketIO.on('listenUser', AppendUser);
      SocketIO.on('deleteRoom', () => route.push('/hall'));
      if(Peer.WEBRTC_SUPPORT){
        navigator.mediaDevices.getUserMedia({
          // video: true,
          audio: true
        }).then((stream: MediaStream) => {
          streamRef.current = stream;
          SocketIO.emit('appendPeer', {roomId: room.id});
          SocketIO.on('makePeer', makePeer);
          SocketIO.on('toPeer', toPeer);
          SocketIO.on('completePeer', completePeer);
        }).catch((err) => {console.log(err)})
      }
      return () => {
        SocketIO.emit('leaveRoom',{room: room.id});
        SocketIO.removeAllListeners();
      }
    }
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
        <ListSpeakers {...state.room}/>
        <div className={style.room__speak_media}>
          { media.map((peer: any, i: number) => {
            return (<Media key={`peer=${i}`} peer={peer} />)
          }) }
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = RoomServerSideProps;

export default Room;