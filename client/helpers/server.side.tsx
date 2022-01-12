import axios from "axios";
import { config } from "../config";
import {IRoom} from "../dto/room.dto";

const ServerSideRequest = (token: string | undefined) => {
  const Axios = axios.create({
    baseURL: config.url,
    headers: {['Authorization']: `Bearer ${token}`}
  })

  return {
    async AllRooms() : Promise<Error | IRoom[]>  {
      try {
        const rooms = await Axios.post('/room/all').then((res) => res.data)
        return rooms;
      } catch (e: any) {
        return new Error(e.name);
      }
    }
  }
}

export default ServerSideRequest;