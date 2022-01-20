import React, {FC} from "react";
import BaseWrapper from "../../layout/base.wrapper";
import style from "./404.module.scss";
import {IUser} from "../../dto/user.dto";

const Custom404: FC = () => {

  return (
    <>
      <BaseWrapper title={"404"} description={"page not found"} userContext={{} as IUser}>
        <div className="flex-grow flex justify-center align-center">
          <h5 className={style.not_found__h5}>404 - Page Not Found</h5>
        </div>
      </BaseWrapper>
    </>
  )
}

export default Custom404