import React from "react";
import style from "./hall.module.scss";
import {NextPage} from "next";
import BaseWrapper from "../../layout/base.wrapper";
import HallPanell from "../../component/hall.panell";
import RoomCard from "../../component/room.card";

const roosm = [
  {
    "id": "61c78c6df4b969f870396fb7",
    "title": "Equitox",
    "message": 55,
    "people": 12,
    "speaker": [
      "Guest",
      "Owner",
      "Member"
    ],
    "avatar": [
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150"
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
      "Member",
      "Owner"
    ],
    "avatar": [
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150"
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
      "Guest",
      "Admin"
    ],
    "avatar": [
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150"
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
      "Owner",
      "Member",
      "Guest"
    ],
    "avatar": [
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150"
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
      "Admin",
      "Guest",
      "Member"
    ],
    "avatar": [
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150",
      "https://random.imagecdn.app/500/150"
    ],
    "createdAt": "2011-07-01T21:58:05.707Z",
    "updatedAt": "2011-07-02T21:58:05.707Z"
  },
]

const roosmId = [
  {id: "asdwqeq"},
  {id: "adas"},
]

interface IRoom {
  id: string;
  title: string;
  message: number;
  people: number;
  speaker: string[];
  avatar: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

const Hall: NextPage = () => {
  return (
    <BaseWrapper title={"Hall"} description={"weclcome to hall page"} isHall={true}>
      <HallPanell title={"Hall"}/>
      <div className={style.hall__content}>
        {roosm.map((room: IRoom, i: number) => <RoomCard key={room.id + i} />)}
      </div>
    </BaseWrapper>
  )
}

export default Hall;