import React, {FC, useState, createContext} from 'react'
import Head from "next/head";
import Footer from "../component/footer";
import NavUser from "../component/nav.user";
import BackArrow from "../component/back.arrow";
import PopupError from "../component/popup.error";
import {IUser} from "../dto/user.dto";

interface IBaseWrapper {
  title: string;
  description: string;
  isHall?: boolean;
  userContext: IUser;
}

interface IErrorState{
  condition: boolean,
  message: string | undefined,
}

export const WarningContext = createContext((message: string): void => {});
export const UserContext = createContext<IUser>({} as IUser);

const BaseWrapper: FC<IBaseWrapper> = ({children, title, description, isHall, userContext}) => {
  const [error, setError] = useState<IErrorState>({
    condition: false,
    message: undefined,
  })

  const warning = (message: string): void => setError({...error, condition: true, message});

  return (
    <UserContext.Provider value={userContext}>
      <WarningContext.Provider value={warning}>
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
        { error.condition &&
          <PopupError message={error.message} callback={() => { setError({...error, condition: false}) }} />
        }
      </WarningContext.Provider>
    </UserContext.Provider>

  )
}

export default BaseWrapper;