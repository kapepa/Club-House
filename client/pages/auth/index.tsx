import {NextPage} from "next";
import BaseWrapper from "../../layout/base.wrapper";
import StepsAuth from "../../component/steps.auth";
import {AuthServerSideProps} from "./server.props";
import {IRoom} from "../../dto/room.dto";
import {IUser} from "../../dto/user.dto";

interface Auth {
  user: IUser,
}

const Auth: NextPage<Auth> = ({user}) => {
  return (
    <BaseWrapper title="Auth" description="Auth description" userContext={user}>
      <StepsAuth />
    </BaseWrapper>
  )
};

export const getServerSideProps = AuthServerSideProps;

export default Auth;