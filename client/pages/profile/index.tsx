import React, {HTMLAttributes, useRef, useState} from "react";
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
import Regexp from "../../helpers/regexp";
import {UpdateAvatar, UpdateUser} from "../../helpers/request";

interface IProfile {
  user: IUser
}

interface IState {
  username: string | undefined,
  fullname: string | undefined,
  avatar: string | File | undefined,
}

const Profile: NextPage<IProfile> = ({user}) => {
  const router = useRouter();
  const [profile, setProfile] = useState<IUser>(user)
  const [state, setState] = useState<IState>({} as IState)
  const {avatar, username, fullname} = profile;
  const inputFileRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;;

  const leaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    Cookie.remove('token');
    router.push('/auth');
  }

  const newNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({...state, [e.target.name as keyof IState]: e.target.value});
  }

  const btnChoiceAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState({...state, avatar: undefined})
    inputFileRef.current.click()
  };

  const btnSetUpClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = (e.target.name as keyof IState);
    if(state[name]) UpdateUser({filed: e.currentTarget.name, value: state[name]}).then((res: {access_token: string}) => {
      if(res.access_token){
        setProfile({...profile, [name]: state[name]});
        setCookie(res.access_token)
      }
    })
  }

  const avatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = ( e.target.files as FileList )[0];

    avatarForm(file).then((res:{access_token: string}) => {
      if(res.access_token){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {if(reader.result) setProfile({...profile, avatar: reader.result})};
        setCookie(res.access_token);
      }
    })
  }

  const avatarForm = async (file: File): Promise<{access_token: string}> => {
    const form = new FormData();
    form.append('avatar', file);
    return UpdateAvatar(form)
  }

  const setCookie = (cookie: string) => Cookie.set('token',cookie);


  return (
    <BaseWrapper title={"Profile"} description={"weclcome to home page"} userContext={profile}>
      <div className={`flex-grow flex justify-center align-center flex-column`}>
        <div className={`${style.profile}`}>
          <div className={`${style.profile__frame} flex align-center`}>
            <div className={`${style.profile__cell}`}>
              <Avatar size={65} url={avatar}/>
            </div>
            <div className={`${style.profile__cell} flex-grow`}>
              <h5 className={`${style.profile__h5}`}>{username}</h5>
              <span className={`${style.profile__span}`}>{fullname}</span>
            </div>
            <div className={`${style.profile__cell}`}>
              <Button
                name={"Leave"}
                callback={leaveClick}
                color={"frame"}
              />
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
              <Button
                name={'Set up'}
                alias={'username'} callback={btnSetUpClick}
                disabled={!(state.username && Regexp.name.test(state.username))}
              />
            </div>
            <div className={`${style.profile__change_row}`}>
              <Input
                classes={style.profile__change_input}
                type={'text'}
                name={'fullname'}
                placeholder={'New Fullname'}
                callback={newNameInput}
              />
              <Button
                name={'Set up'}
                alias={'fullname'}
                callback={btnSetUpClick}
                disabled={!(state.fullname && Regexp.name.test(state.fullname))}
              />
            </div>
            <div className={`${style.profile__change_row}`}>
              <input
                ref={inputFileRef}
                type={'file'}
                name={'avatar'}
                className={'display-none'}
                onChange={avatarChange}
              />
              <Button name={'Set Avatar'} alias={'avatar'} callback={btnChoiceAvatarClick} />
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}

export const getServerSideProps = ProfileServerSideProps;

export default Profile;
