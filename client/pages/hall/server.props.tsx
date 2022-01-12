import { GetServerSideProps } from 'next'
import Cookies from "next-cookies"
import ServerSideRequest from "../../helpers/server.side";


export const HallServerSideProps: GetServerSideProps = async (context) => {
  const { AllRooms } = ServerSideRequest(Cookies(context).token);
  const rooms = await AllRooms();

  return {
    props: { rooms },
  }
}