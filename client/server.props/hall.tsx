import { GetServerSideProps } from 'next'
import Cookies from "next-cookies"
import ServerSideRequest from "../helpers/server.side";
import {wrapper} from "../redux/store";
import {setUser} from "../redux/user/userAction";

export const HallServerSideProps: GetServerSideProps =  wrapper.getServerSideProps(store => async (context) => {
  try {
    const token = Cookies(context).token;
    const { AllRooms, GetProfile } = ServerSideRequest(token);

    if(!token) return {redirect: { permanent: false, destination: "/auth" }};
    if(!Object.keys(store.getState().user).length) await store.dispatch(setUser(await GetProfile()));

    const user = store.getState().user;
    if(!Object.keys(user).length) return {redirect: { permanent: false, destination: "/auth" }};

    const rooms = await AllRooms();

    return {
      props: { rooms, user }
    }
  } catch (e: any) {
    throw e.name
  }
});