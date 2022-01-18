import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import BaseWrapper from "../../layout/base.wrapper";
import {HomeServerSideProps} from "./server.props";
import {IUser} from "../../dto/user.dto";
import style from "./home.module.scss"

interface IHome {
  user: IUser
}

const Home: NextPage<IHome> = ({user}) => {
  const router = useRouter();
  return (
    <BaseWrapper title={"Home"} description={"weclcome to home page"} userContext={user}>
      <div className={style.home__cap}>
        <div
          className={`${style.home__link} pointer`}
          onClick={() => router.push('/hall')}
        >To Hall</div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = HomeServerSideProps

export default Home
