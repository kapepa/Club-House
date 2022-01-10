import React, {FC} from "react";
import Image from "next/image";
import DefaultAvatar from "../../public/jpg/people.png";
import style from "./avatar.module.scss";

interface IAvatar {
  url?: string | undefined | File,
  callback? (e: React.MouseEvent<HTMLImageElement>): void;
  size?: number;
  className?: string;
}

const Avatar: FC<IAvatar> = ({callback, size = 50, url, className}) => {
  return (
    <>
      {url && typeof url === 'string' ?
        <img
          src={url}
          alt="avatar"
          width={size}
          height={size}
          className={`${style.avatar__image} ${callback ? style.avatar__pointer : '' } ${className ? className : ''}`}
          onClick={callback}
        /> : '' }
      { url === undefined ?
        <Image
          src={ DefaultAvatar }
          alt="default avatar"
          width={size}
          height={size}
          className={`${style.avatar__image} ${callback ? style.avatar__pointer : '' } ${className ? className : ''}`}
          onClick={callback}
        />: ''}
    </>
  )
}

export default Avatar;