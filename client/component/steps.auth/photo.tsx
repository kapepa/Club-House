import React, {FC} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Avatar from "../avatar";

interface IPhoto {
  callback(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Photo: FC<IPhoto> = ({callback}) => {

  const ChosePhone = (e: React.MouseEvent<HTMLImageElement>) => {
    console.log(e.target)
  }

  const NextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback(e)
  }

  return (
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__photo}`}>Okay, New Name!</h3>
        <span className={`${style.steps__span}`}>
          How`s this photo?
        </span>
      </div>
      <div className={`flex justify-center flex-column ${style.steps__content}`}>
        <div className={`flex justify-center ${style.steps__area}`}>
          <Avatar callback={ChosePhone} size={60} />
        </div>
        <span className={`${style.steps__span}`}>
          Choose different photo!
        </span>
      </div>
      <div className="flex justify-center">
        <Button name="Next" callback={NextClick}/>
      </div>
    </>
  )
}

export default Photo;