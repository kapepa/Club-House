import { GetServerSideProps } from 'next'
import { OneRooms } from "../../helpers/request";

export const RoomServerSideProps: GetServerSideProps = async (context) => {
  const room = await OneRooms(context.query.id as string);
  return {
    props: { room },
  }
}