import { GetServerSideProps } from 'next'
import Axios from "../../helpers/axios";

export const RoomServerSideProps: GetServerSideProps = async (context) => {
  const room = await Axios.post(`/room/one/${context.query.id}`).then((res) => res.data)
  return {
    props: { room },
  }
}