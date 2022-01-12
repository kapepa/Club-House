import { GetServerSideProps } from 'next'
import { AllRooms } from "../../helpers/request";
import Cookies from "next-cookies"
import Axios from "../../helpers/axios";


export const HallServerSideProps: GetServerSideProps = async (context) => {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies(context).token}`;
  const rooms = await AllRooms();

  return {
    props: { rooms },
  }
}