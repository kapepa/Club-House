import axios from "axios";
import { config } from "../config";
import {IRoom} from "../dto/room.dto";
import {IUser} from "../dto/user.dto";

const ServerSideRequest = (token: string | undefined) => {
  const Axios = axios.create({
    baseURL: config.url,
    headers: {['Authorization']: `Bearer ${token}`}
  })

  return {
    async AllRooms(): Promise<Error | IRoom[]> {
      try {
        const rooms = await Axios.post('/room/all').then((res) => res.data)
        return rooms;
      } catch (e: any) {
        throw e.name
      }
    },
    async GetProfile(): Promise<IUser> {
      try{
        const user = await Axios.post('/user/own').then(res => res.data);
        return user;
      }
      catch (e: any) {
        throw e.name
      }
    },
    async OneRoom (id: string | string[]): Promise<IRoom> {
      try {
        const room = await Axios.post(`/room/one/${id}`).then(res => res.data);
        return room;
      }catch (e:any){
        throw e.name
      }
    }
  }
}

export default ServerSideRequest;