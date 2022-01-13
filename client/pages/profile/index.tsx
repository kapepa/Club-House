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

  const newNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.name)
  }

  const btnSetUpClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget.name)
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
          <div className={'flex flex-column align-center'}>
            <div className={`${style.profile__change_row}`}>
              <Input
                classes={style.profile__change_input}
                type={'text'}
                name={'username'}
                placeholder={'New Username'}
                callback={newNameInput}
              />
              <Button name={'Set up'} alias={'username'} callback={btnSetUpClick} />
            </div>
            <div className={`${style.profile__change_row}`}>
              <Input
                classes={style.profile__change_input}
                type={'text'}
                name={'fullname'}
                placeholder={'New Fullname'}
                callback={newNameInput}
              />
              <Button name={'Set up'} alias={'fullname'} callback={btnSetUpClick} />
            </div>
            <div className={`${style.profile__change_row}`}>
              <input type={'file'} name={'avatar'} className={'display-none'}/>
              <Button name={'New Avatar'} alias={'avatar'} callback={btnSetUpClick} />
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = ProfileServerSideProps;

export default Profile;
