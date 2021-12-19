import React, { FC } from 'react'
import Head from "next/head";
import Footer from "../component/footer";
import NavUser from "../component/nav.user";

interface IBaseWrapper {
  title: string;
  description: string;
}

const BaseWrapper: FC<IBaseWrapper> = ({children, title, description}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex flex-column vh">
        <main className="flex-grow">
          <div className="container">
            <NavUser/>
          </div>
          <div className="container">
            {children}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default BaseWrapper;