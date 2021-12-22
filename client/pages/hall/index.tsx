import React from "react";
import style from "./hall.module.scss";
import {NextPage} from "next";
import BaseWrapper from "../../layout/base.wrapper";

const Hall: NextPage = () => {
  return (
    <BaseWrapper title={"Hall"} description={"weclcome to hall page"}>
      Hall
    </BaseWrapper>
  )
}

export default Hall;