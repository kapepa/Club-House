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


  const [signals, setSignals] = useState<any>([]);

  const signalRef = useRef<any>({});

  const [audio, setAudio] = useState([])

  const [stream, setStream] = useState<any>()

  const audioRef = useRef<any>(null)


  const addPeer = (offer: { signal: any, userId: string}) => {
    const peer = new Peer({
      initiator: false,
    });

    peer.signal(offer.signal);

    peer.on('signal', data => {
      if(data.type === 'answer') SocketIO.emit('answerPeer',{ signal: data, userId: offer.userId });
    });

    peer.on('stream', (stream: any) => {
      console.log(stream)
    })

  }


  useEffect(() => {

    if(window === undefined) return;

    const ownPeer = new Peer({
      initiator: true,
    });

    ownPeer.on('signal', data => {
      if(data.type === 'offer') {
        signalRef.current = data;
        SocketIO.emit('appendPeer');
      }
    })

    ownPeer.on('stream', (stream: any) => {
      console.log(stream)
    })

    SocketIO.on('makePeer',(data: { userId: string }) => {
      SocketIO.emit('offerPeer',{signal: signalRef.current, userId: data.userId})
    });

    SocketIO.on('toPeer',(offer: { signal: any, userId: string}) => addPeer(offer));
    SocketIO.on('completePeer', (signal: any) => {
      ownPeer.signal(signal)
    });


    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      console.log(stream)
      ownPeer.addStream(stream)
    }).catch(() => {})

  },[])


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

          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = RoomServerSideProps;

export default Room;