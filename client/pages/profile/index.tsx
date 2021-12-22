import React from "react";
import {NextPage} from "next";
import style from "./profile.module.scss";
import BaseWrapper from "../../layout/base.wrapper";
import Avatar from "../../component/avatar";
import Button from "../../component/button";

const Profile: NextPage = () => {
  return (
    <BaseWrapper title={"Profile"} description={"weclcome to home page"}>
      <div className={`flex-grow flex justify-center align-center flex-column`}>
        <div className={`${style.profile}`}>
          <div className={`${style.profile__frame} flex align-center`}>
            <div className={`${style.profile__cell}`}>
              <Avatar size={65}/>
            </div>
            <div className={`${style.profile__cell}`}>
              <h5 className={`${style.profile__h5}`}>Real Name</h5>
              <span className={`${style.profile__span}`}>Real Surname</span>
            </div>
            <div className={`${style.profile__cell}`}>
              <Button name={"Follow"} callback={() => {}} color={"frame"}/>
            </div>
          </div>
          <div className={`${style.profile__desc}`}>
            This short description
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}

export default Profile;
