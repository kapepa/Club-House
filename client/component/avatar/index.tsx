import React, {FC} from "react";
import Image from "next/image";
import DefaultAvatar from "../../public/jpg/people.png";
import style from "./avatar.module.scss";

interface IAvatar {
  callback ? (e: React.MouseEvent<HTMLImageElement>): void;
  size? : number;
}

const Avatar: FC<IAvatar> = ({callback, size = 50}) => {
  return (
    <div>
      <Image
        src={DefaultAvatar}
        alt="default avatar"
        width={size}
        height={size}
        className={`${style.avatar__image} ${callback ? style.avatar__pointer : '' }`}
        onClick={callback}
      />
    </div>
  )
}

export default Avatar;