import React, {FC} from "react";
import Image from "next/image";
import DefaultAvatar from "../../public/jpg/people.png";
import style from "./avatar.module.scss";

interface IAvatar {
  url?: string | undefined ,
  callback ? (e: React.MouseEvent<HTMLImageElement>): void;
  size? : number;
}

const Avatar: FC<IAvatar> = ({callback, size = 50, url}) => {

  return (
    <>
      <Image
        src={url ? url : DefaultAvatar}
        alt="default avatar"
        width={size}
        height={size}
        className={`${style.avatar__image} ${callback ? style.avatar__pointer : '' }`}
        onClick={callback}
      />
    </>
  )
}

export default Avatar;