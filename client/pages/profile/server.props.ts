import {GetServerSideProps} from "next";
import {wrapper} from "../../redux/store";
import Cookies from "next-cookies";
import ServerSideRequest from "../../helpers/server.side";
import {setUser} from "../../redux/user/userAction";

export const ProfileServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (context) => {
  try {
    const token = Cookies(context).token;
    const { GetProfile } = ServerSideRequest(token);

    if(!Object.keys(store.getState().user).length) await store.dispatch(setUser(await GetProfile()));

    const user = store.getState().user;

    if(!token || !Object.keys(user).length) return {redirect: { permanent: false, destination: "/auth" }};

    return {
      props: { user }
    }
  } catch (e: any) {
    throw e.name
  }
});
