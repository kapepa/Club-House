import { GetServerSideProps } from 'next'
import { AllRooms } from "../../helpers/request";


export const HallServerSideProps: GetServerSideProps = async (context) => {
  const rooms = await AllRooms();
  return {
    props: { rooms },
  }
}