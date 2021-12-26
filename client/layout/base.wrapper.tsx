import React, { FC } from 'react'
import Head from "next/head";
import Footer from "../component/footer";
import NavUser from "../component/nav.user";
import BackArrow from "../component/back.arrow";

interface IBaseWrapper {
  title: string;
  description: string;
  isHall?: boolean
}

const BaseWrapper: FC<IBaseWrapper> = ({children, title, description, isHall}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container">
        <div className="flex flex-column vh">
          <main className="flex flex-column flex-grow">
            <NavUser/>
            <BackArrow/>
            {children}
          </main>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default BaseWrapper;