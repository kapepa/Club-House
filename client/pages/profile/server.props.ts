import {GetServerSideProps} from "next";
import {wrapper} from "../../redux/store";
import Cookies from "next-cookies";
import ServerSideRequest from "../../helpers/server.side";
import {setUser} from "../../redux/user/userAction";

export const ProfileServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (context) => {
  try {
    const token = Cookies(context).token;
    const { GetProfile } = ServerSideRequest(token);

    if(!token) return {redirect: { permanent: false, destination: "/auth" }};
    if(!Object.keys(store.getState().user).length) await store.dispatch(setUser(await GetProfile()));
    if(!Object.keys(store.getState().user).length) return {redirect: { permanent: false, destination: "/auth" }};

    const user = store.getState().user;

    return {
      props: { user }
    }
  } catch (e: any) {
    throw e.name
  }
});
