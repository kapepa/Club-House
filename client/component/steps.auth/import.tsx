import React, {FC} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";
import Avatar from "../avatar";

interface IImport {
  callback(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Import: FC<IImport> = ({callback}) => {

  const ImportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback(e)
  }

  const AvatarClick = (e: React.MouseEvent<HTMLImageElement>) => {
    console.log(e.target)
  }

  return (
    <>
      <div className={`flex justify-center ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__import}`}>Do you want import info from GitHub?</h3>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <Avatar callback={AvatarClick} size={60}/>
      </div>
      <div className="flex justify-center">
        <Button name="Import from GitHub" callback={ImportClick}/>
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <Link href="/myinfo">
          <a className={`${style.steps__anchor}`}>Enter my info manually</a>
        </Link>
      </div>
    </>
  )
}

export default Import