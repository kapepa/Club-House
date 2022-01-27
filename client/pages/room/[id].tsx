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

  const audioRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(gotMedia).catch(() => {})

    function gotMedia (stream: any) {
      const peer1 = new Peer({ initiator: true, stream: stream, trickle: false })
      const peer2 = new Peer()

      peer1.on('signal', data => {
        if(data.type === 'offer') SocketIO.emit('offerPeer',{ signal: data });
      })

      SocketIO.on('toPeer', (offer: { signal: any, userId: string}) => {
        console.log(offer)
        peer2.signal(offer.signal);
        peer2.on('signal', data => {
          if(data.type === 'answer') SocketIO.emit('answerPeer',{ signal: data, userId: offer.userId });
        })
      });

      SocketIO.on('completePeer', (signal: any) => {
        peer1.signal(signal)
      })

      peer2.on('stream', (stream: any) => {
        console.log(stream)
        // got remote video stream, now let's show it in a video tag
        const video = document.createElement('video')

        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream) // for older browsers
        }

        video.play()

        audioRef.current?.appendChild(video)
      })
    }
    // const peer1 = new Peer({initiator: true})
    // const peer2 = new Peer({initiator: true})
    //
    // peer1.on('signal', data => {
    //   if(data.type === 'offer') SocketIO.emit('offerPeer',{ signal: data });
    // })
    //
    // SocketIO.on('toPeer', (offer: { signal: any, userId: string}) => {
    //   peer2.signal(offer.signal);
    //   peer2.on('signal', data => {
    //     if(data.type === 'answer') SocketIO.emit('answerPeer',{ signal: data, userId: offer.userId });
    //   })
    // });
    //
    // SocketIO.on('completePeer', (signal: any) => {
    //   peer1.signal(signal)
    // })
    //
    // peer2.on('stream', (stream: any) => {
    //   console.log(stream)
    //   // got remote video stream, now let's show it in a video tag
    //   const video = document.createElement('video')
    //
    //   if ('srcObject' in video) {
    //     video.srcObject = stream
    //   } else {
    //     video.src = window.URL.createObjectURL(stream) // for older browsers
    //   }
    //
    //   video.play()
    //
    //   audioRef.current?.appendChild(video)
    // })
    //
    // function addMedia (stream: any) {
    //   peer1.addStream(stream) // <- add streams to peer dynamically
    // }
    //
    // navigator.mediaDevices.getUserMedia({
    //   video: true,
    //   audio: true
    // }).then(addMedia).catch(() => {})
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