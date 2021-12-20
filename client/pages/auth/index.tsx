import {NextPage} from "next";
import BaseWrapper from "../../layout/base.wrapper";
import StepsAuth from "../../component/steps.auth";

const Auth: NextPage = () => {
  return (
    <BaseWrapper title="Auth" description="Auth description">
      <StepsAuth />
    </BaseWrapper>
  )
};

export default Auth;