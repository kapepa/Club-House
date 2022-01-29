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
import Peer, { SignalData } from "simple-peer";
import SocketIO from "../../helpers/socket";
import {Stream} from "stream";
import Video from "../../component/video";

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
      if(Peer.WEBRTC_SUPPORT){
        navigator.mediaDevices.getUserMedia({
          // video: true,
          audio: true
        }).then((stream: MediaStream) => {
          setStream(stream);
          SocketIO.emit('appendPeer', {roomId: room.id});

        }).catch((err) => {console.log(err)})
      }
      return () => {
        SocketIO.emit('leaveRoom',{room: room.id});
        SocketIO.removeAllListeners();
      }
    }
  },[]);

  const ownPeerRef = useRef<any>(null)
  const anyPeerRef = useRef<any>(null)

  const signaPeerMap = useRef<Map<string, any>>(new Map());
  const [stream, setStream] = useState<MediaStream>()

  const myPeer = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    })

    peer.on('connect', () => {
      console.log('connect')
    })

    // peer.on('stream', (stream: Stream) => {
    //   console.log(stream)
    // })

    return peer;
  }

  const appendPeer = () => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
    });

    peer.on('connect', () => {
      console.log('connect')
    })

    // peer.on('stream', (stream: Stream) => {
    //   console.log(stream)
    // })

    return peer;
  }

  const makePeer = (prop: {userId: string}) => {
    const peer = myPeer();
    peer.on('signal', (data: SignalData) => {
      SocketIO.emit('offerPeer', {signal: data, userId: prop.userId})
    })
    signaPeerMap.current.set( prop.userId, peer )
  }

  const toPeer = (prop: { signal: SignalData, userId: string }) => {
    const peer = appendPeer();
    peer.signal(prop.signal)
    peer.on('signal', (data: SignalData) => {
      SocketIO.emit('answerPeer', {signal: data, userId: prop.userId})
    })
    signaPeerMap.current.set(prop.userId, peer)
  }
  
  const completePeer = (prop: { signal: SignalData, userId: string }) => {
    signaPeerMap.current.get(prop.userId).signal(prop.signal)
  }


  useEffect(() => {

    SocketIO.on('makePeer', makePeer);
    SocketIO.on('toPeer', toPeer);
    SocketIO.on('completePeer', completePeer);

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
          { Array.from(signaPeerMap.current.values()).map((signal: SignalData, i: number) => {
            return (<Video key={`signal=${i}`} />)
          }) }
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = RoomServerSideProps;

export default Room;