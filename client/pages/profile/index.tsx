import React from "react";
import {useRouter} from "next/router";
import {NextPage} from "next";
import Cookie from "js-cookie"
import style from "./profile.module.scss";
import BaseWrapper from "../../layout/base.wrapper";
import Avatar from "../../component/avatar";
import Button from "../../component/button";
import {ProfileServerSideProps} from "./server.props";
import {IUser} from "../../dto/user.dto";
import Input from "../../component/input";


interface IProfile{
  user: IUser
}

const Profile: NextPage<IProfile> = ({user}) => {
  const router = useRouter();
  const {avatar, username, fullname} = user;
  const leaveClick = (e: React.MouseEvent<HTMLElement>) => {
    Cookie.remove('token');
    router.push('/auth');
  }

  return (
    <BaseWrapper title={"Profile"} description={"weclcome to home page"} userContext={user}>
      <div className={`flex-grow flex justify-center align-center flex-column`}>
        <div className={`${style.profile}`}>
          <div className={`${style.profile__frame} flex align-center`}>
            <div className={`${style.profile__cell}`}>
              <Avatar size={65} url={avatar}/>
            </div>
            <div className={`${style.profile__cell}`}>
              <h5 className={`${style.profile__h5}`}>{username}</h5>
              <span className={`${style.profile__span}`}>{fullname}</span>
            </div>
            <div className={`${style.profile__cell}`}>
              <Button name={"Leave"} callback={leaveClick} color={"frame"}/>
            </div>
          </div>
          <div className={`${style.profile__desc}`}>
            {`Hello dear ${username} you are in your personal profile`}
          </div>
          <div>
            <div>
              <Input type={'text'} name={'username'} placeholder={'New Username'} callback={() => {}} />
              <Button name={'Set up'} alias={'username'} callback={() => {}} />
            </div>
            <div>
              <Input type={'text'} name={'fullname'} placeholder={'New Fullname'} callback={() => {}} />
              <Button name={'Set up'} alias={'fullname'} callback={() => {}} />
            </div>
            <div>
              <Input type={'text'} name={'fullname'} placeholder={'New Fullname'} callback={() => {}} />
              <Button name={'New Avatar'} alias={'avatar'} callback={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = ProfileServerSideProps;

export default Profile;
