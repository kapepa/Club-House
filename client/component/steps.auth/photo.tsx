import React, {FC, useState, useRef} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Avatar from "../avatar";

interface IPhoto {
  callback(e: {next: boolean, avatar?: File | string | undefined}): void;
}

const Photo: FC<IPhoto> = ({callback}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  const ChosePhone = (e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLSpanElement>) => {
    if(fileRef.current) fileRef.current.click();
  }

  const NextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    callback({next: true})
  }

  const FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];

    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = () => setAvatar(String(fr.result))
      fr.readAsDataURL(file);
    }

    callback({next: false, avatar: file})
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
          <Avatar callback={ChosePhone} size={60} url={avatar} />
          <input
            className={style.steps__avatar_file}
            name="avatar"
            ref={fileRef}
            type="file"
            onChange={FileChange}
          />
        </div>
        <span onClick={ChosePhone} className={`${style.steps__span} pointer`}>
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