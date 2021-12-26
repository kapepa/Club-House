import React, {useEffect} from "react";
import style from "./hall.module.scss";
import {NextPage} from "next";
import BaseWrapper from "../../layout/base.wrapper";
import HallPanell from "../../component/hall.panell";
import RoomCard from "../../component/room.card";
import { IRoom } from "../../dto/room";
import Axios from "../../helpers/axios";

const roosm = [
  {
    "id": "61c78c6df4b969f870396fb7",
    "title": "Equitox",
    "message": 55,
    "people": 12,
    "speaker": [
      {
        "username": "Guest",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Owner",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Member",
        "avatar": "https://random.imagecdn.app/500/150",
      },
    ],
    "createdAt": "2014-09-25T15:31:24.198Z",
    "updatedAt": "2014-09-26T15:31:24.198Z"
  },
  {
    "id": "61c78c6dfbb394e9a228acc1",
    "title": "Beadzza",
    "message": 94,
    "people": 41,
    "speaker": [
      {
        "username": "Member",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Owner",
        "avatar": "https://random.imagecdn.app/500/150",
      },
    ],
    "createdAt": "2013-01-09T03:06:53.081Z",
    "updatedAt": "2013-01-10T03:06:53.081Z"
  },
  {
    "id": "61c78c6da07ba0e640ff939f",
    "title": "Ontagene",
    "message": 77,
    "people": 94,
    "speaker": [
      {
        "username": "Guest",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Admin",
        "avatar": "https://random.imagecdn.app/500/150",
      },
    ],
    "createdAt": "2012-02-09T20:41:13.069Z",
    "updatedAt": "2012-02-10T20:41:13.069Z"
  },
  {
    "id": "61c78c6d4d661152f111dc25",
    "title": "Dragbot",
    "message": 28,
    "people": 39,
    "speaker": [
      {
        "username": "Owner",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Member",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Guest",
        "avatar": "https://random.imagecdn.app/500/150",
      },
    ],

    "createdAt": "2010-11-27T01:52:42.447Z",
    "updatedAt": "2010-11-28T01:52:42.447Z"
  },
  {
    "id": "61c78c6dc66c3a07f53ca8d3",
    "title": "Valpreal",
    "message": 31,
    "people": 19,
    "speaker": [
      {
        "username": "Admin",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Guest",
        "avatar": "https://random.imagecdn.app/500/150",
      },
      {
        "username": "Member",
        "avatar": "https://random.imagecdn.app/500/150",
      },
    ],
    "createdAt": "2011-07-01T21:58:05.707Z",
    "updatedAt": "2011-07-02T21:58:05.707Z"
  },
]

const Hall: NextPage = () => {
  useEffect(()=>{
    Axios.post('/room/all').then((data) => {
      console.log(data)
    })
  },[])

  return (
    <BaseWrapper title={"Hall"} description={"weclcome to hall page"} isHall={true}>
      <HallPanell title={"Hall"}/>
      <div className={`${style.hall__content}`}>
        {roosm.map((room: IRoom, i: number) => <RoomCard key={room.id + i} {...room} />)}
      </div>
    </BaseWrapper>
  )
}

export default Hall;