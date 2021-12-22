import React, {FC} from "react";
import {useRouter} from "next/router";
import style from "./back.arrow.module.scss";

const BackArrow: FC = () => {
  const router = useRouter();
  return (
    <div className="flex justify-flex-start align-center">
      <div onClick={() => router.back()} className={style.back_arrow}></div>
      <span onClick={() => router.back()} className={`${style.back_arrow__back} pointer`}>Back</span>
    </div>
  )
}

export default BackArrow;

