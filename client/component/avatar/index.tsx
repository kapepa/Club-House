import React, {FC} from "react";
import Image from "next/image";
import DefaultAvatar from "../../public/jpg/people.png";
import style from "./avatar.module.scss";

const Avatar: FC = () => {
  return (
    <div>
      <Image
        src={DefaultAvatar}
        alt="default avatar"
        width={55}
        height={50}
        className={style.avatar__image}
      />
    </div>
  )
}

export default Avatar;