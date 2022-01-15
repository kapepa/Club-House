import React, {FC} from "react";
import Image from "next/image";
import DefaultAvatar from "../../public/jpg/people.png";
import style from "./avatar.module.scss";
import { config } from "../../config";

interface IAvatar {
  url?: string | undefined | File | ArrayBuffer,
  callback? (e: React.MouseEvent<HTMLImageElement>): void;
  size?: number;
  className?: string;
}

const Avatar: FC<IAvatar> = ({callback, size = 50, url, className}) => {
  return (
    <>
      {url && typeof url === 'string' && url !== '' ?
        <img
          src={/http/.test(url) || /data:image/.test(url) ? url : `${config.url}/${url}`}
          alt="avatar"
          width={size}
          height={size}
          className={`${style.avatar__image} ${callback ? style.avatar__pointer : '' } ${className ? className : ''}`}
          onClick={callback}
        /> : '' }
      { url === undefined || url === '' ?
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