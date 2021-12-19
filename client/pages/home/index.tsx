import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'
import BaseWrapper from "../../layout/base.wrapper";

const Home: NextPage = () => {
  return (
    <BaseWrapper title={"Home"} description={"weclcome to home page"}>
      <div>
        Home Сьешь еще франц
      </div>
    </BaseWrapper>
  )
}

export default Home
