import Axios from './axios';
import { IRoom } from "../dto/room.dto";
import id from "../pages/room/[id]";

export const RegUser = async (form: any) => {
  try {
    const user = await Axios.post('/auth/registration', form ).then((res) => res.data);
    return user;
  } catch (e: any){
    throw e.name
  }
}

export const CodeConfirmed = async (data: {id: string, code: string}) => {
  try {
    const confirmed = await Axios.post('/auth/confirmed', data ).then((res) => res.data);
    return confirmed;
  } catch (e: any) {
    throw e.name
  }
}

export const LoginUser = async (data: {login: string, password: string}) => {
  try {
    const user = await Axios.post('/auth/login', data).then(res => res.data);
    return user;
  } catch (e: any) {
    throw e.name;
  }
}

export const UpdateUser = async (data: {filed: string, value: string | File | undefined}) => {
  try {
    const user = await Axios.post('/user/update', data).then(res => res.data);
    return user
  } catch (e: any){
    throw e.name;
  }
}

export const UpdateAvatar = async (form: any) => {
  try {
    const user = await Axios.post('/user/avatar', form).then(res => res.data);
    return user;
  } catch (e: any){
    throw e.name;
  }
}

export const CreateRoom = async (room: { title: string; type: string }) => {
  try{
    const newRoom = await Axios.post('/room/create', room).then(res => res.data);
    return newRoom;
  }catch (e: any){
    throw e.name;
  }
}

export const DeleteRoom = async (id: string) => {
  try{
    const delRoom = await Axios.delete(`/room/delete/${id}`).then(res => res.data);
    return delRoom;
    return
  }catch (e: any){
    throw e.name;
  }
}

export const GetAllRooms = async () => {
  try{
    const rooms = await Axios.post('/room/all').then(res => res.data);
    return rooms;
  }catch (err: any){
    throw err.name;
  }
}



