import Axios from './axios';
import { IRoom } from "../dto/room.dto";

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
    throw e.name
  }
}

export const UpdateUser = async (data: {filed: string, value: string | File | undefined}) => {
  try {
    const user = await Axios.post('/user/update', data).then(res => res.data);
    return user
  } catch (e: any){
    throw e.name
  }
}

export const UpdateAvatar = async (form: any) => {
  try {
    const user = await Axios.post('/user/avatar', form).then(res => res.data);
    return user;
  } catch (e: any){
    throw e.name
  }
}
export const CreateRoom = async (room: { title: string; type: string }) => {
  try{
    const newRoom = await Axios.post('/room/create', room).then(res => res.data);
    return newRoom;
  }catch (e: any){
    throw e.name
  }
}

