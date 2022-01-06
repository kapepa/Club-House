import Axios from './axios';
import {IRoom} from "../dto/room.dto";

export const AllRooms = async (): Promise<Error | IRoom[]>  => {
  try {
    const rooms = await Axios.post('/room/all').then((res) => res.data)
    return rooms;
  } catch (e: any) {
    return new Error(e.name);
  }
}

export const OneRooms = async (id: string): Promise<Error | IRoom>  => {
  try {
    const room = await Axios.post(`/room/one/${id}`).then((res) => res.data)
    return room;
  } catch (e: any) {
    return new Error(e.name);
  }
}

export const RegUser = async (form: any) => {
  try {
    const user = await Axios.post('/auth/registration', form, {
      headers: form.getHeaders(),
    }).then((res) => res.data);
    return user;
  } catch (e: any){
    return new Error(e.name);
  }
}

