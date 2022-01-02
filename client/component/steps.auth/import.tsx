import React, {FC} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";
import Avatar from "../avatar";

interface IImport {
  callback(data: {next: boolean}): void;
}

const Import: FC<IImport> = ({callback}) => {

  const ImportClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    callback({next: true});
  }

  const GitHubClick = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target)
  }

  const GoogleClick = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target)
  }

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
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <a onClick={ImportClick} className={`${style.steps__anchor}`}>Enter my info manually</a>
      </div>
    </>
  )
}

export default Import