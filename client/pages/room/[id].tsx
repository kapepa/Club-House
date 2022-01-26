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
  const [signal, setSignal] = useState<any>({});

  const [audio, setAudio] = useState([])

  const audioRef = useRef<HTMLDivElement | null>(null)

  const RemoveRoom = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if(state.owner) await DeleteRoom(room.id).then( (res: boolean) => {
      if(res){
        route.push('/hall');
        SocketIO.emit('deleteRoom', {room: room.id})
      }
    })
  }

  const PeerContainer = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(gotMedia).catch(() => {})

    function gotMedia (stream: any) {
      const owner = new Peer({ initiator: true, stream: stream })
      const other = new Peer()

      owner.on('signal', signal => {
        if(signal.type === 'offer'){
          setSignal(signal)
          SocketIO.emit('offerPeer', { signal: signal, room: room.id })
        }
      })

      SocketIO.on('makePeer', (data: {signal: any, userId: string}) => {
        other.signal(data.signal);
        owner.on('signal', signal => {
          if(signal.type === 'answer') SocketIO.emit('answerPeer', {signal, userId: data.userId})
        })
      })

      SocketIO.on('completePeer',(data) => {
        other.signal(data)
      })

      other.on('stream', (stream: any) => {
        const video = document.createElement('video');

        console.log(stream)

        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream) // for older browsers
        }

        video.play()

        audioRef.current?.appendChild(video)
      })
    }
  }

  const AppendUser = (speaker: any) => {
    setState({...state, room: {...state.room, speaker: speaker}})
  }

  useEffect(() => {
    if(window !== undefined){
      SocketIO.emit('joinRoom',{room: room.id}, AppendUser);
      SocketIO.on('listenUser', AppendUser);
      SocketIO.on('deleteRoom', () => route.push('/hall'));
      PeerContainer()
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