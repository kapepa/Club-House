import { GetServerSideProps } from 'next'
import {wrapper} from '../../redux/store';
import Cookies from "next-cookies"
import ServerSideRequest from '../../helpers/server.side';
import {setUser} from "../../redux/user/userAction";
import {setRoom} from "../../redux/room/roomAction";

export const RoomServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (context) => {
  try{
    const roomId = context.query.id;
    const token = Cookies(context).token;
    const {GetProfile, OneRoom} = ServerSideRequest(token);

    if(!Object.keys(store.getState().user).length) await store.dispatch(setUser(await GetProfile()));

    const user = store.getState().user;

    if(!token || !Object.keys(user).length) return {redirect: { permanent: false, destination: "/auth" }};

    if(roomId && !Object.keys(store.getState().room).length) await store.dispatch(setRoom(await OneRoom(roomId)))

    const room = store.getState().room;

    if(!Object.keys(room).length) return {redirect: { permanent: false, destination: "/hall" }};

    return {
      props: { room, user }
    }
  } catch (e:any){
    throw e.name
  }
})