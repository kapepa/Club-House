import type { NextPage } from 'next'
import BaseWrapper from "../../layout/base.wrapper";

const Home: NextPage = () => {
  return (
    <BaseWrapper title={"Home"} description={"weclcome to home page"}>
      <div>
        Home
      </div>
    </BaseWrapper>
  )
}

export default Home
