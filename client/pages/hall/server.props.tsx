import { GetServerSideProps } from 'next'
import Axios from "../../helpers/axios";

export const HallServerSideProps: GetServerSideProps = async (context) => {
  const rooms = await Axios.post('/room/all').then((res) => res.data)
  return {
    props: { rooms },
  }
}