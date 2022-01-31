import React, {FC, useEffect} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Avatar from "../avatar";
import { config } from "../../config";
import {IUser} from "../../dto/user.dto";

interface IImport {
  callback(data: {next: boolean, profile?: {id: string, username: string, avatar: string, phone: string}}): void;
}

const Import: FC<IImport> = ({callback}) => {
  const ImportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    callback({next: true});
  }

  const GitHubClick = async (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(`${config.url}/auth/github`,`AuthGitHub`, `left=100,top=100,width=520,height=520`);
  }

  const GoogleClick = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(`${config.url}/auth/google`, `AuthGoogle`, `left=100,top=100,width=520,height=520`);
  }

  const FaceBookClick = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(`${config.url}/auth/facebook`, `AuthFaceBook`, `left=100,top=100,width=520,height=520`);
  }

  useEffect(() => {
    if( window !== undefined ){
      window.addEventListener('message', (e: MessageEvent) => {
        const {id, username, avatar, phone} = e.data;
        if(id || username) callback({next: true, profile: {id, username, avatar, phone}});
      })
    }
  },[]);

  return (
    <>
      <div className={`flex justify-center ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__import}`}>Do you want import info from social?</h3>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <Avatar callback={() => {}} size={60}/>
      </div>
      <div className="flex justify-center flex-column">
        <div className={`flex content-center ${style.steps__cell}`}>
          <Button name="Import from GitHub" callback={GitHubClick}/>
        </div>
        <div className={`flex content-center ${style.steps__cell}`}>
          <Button name="Import from Google" callback={GoogleClick}/>
        </div>
        <div className={`flex content-center ${style.steps__cell}`}>
          <Button name="Import from Facebook" callback={FaceBookClick}/>
        </div>
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <a onClick={ImportClick} className={`${style.steps__anchor}`}>Enter my info manually</a>
      </div>
    </>
  )
}

export default Import;