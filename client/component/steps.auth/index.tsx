import React, {FC, useState} from "react";
import style from "./steps.auth.module.scss";
import Welcome from "./welcome";
import Import from "./import";
import People from "./people";
import Photo from "./photo";
import Phone from "./phone";
import Code from "./code";

interface IState {
  welcome: boolean;
  name: string | null;
  avatar: string | undefined | File,
}

const StepsAuth: FC = () => {
  const [step, setStep] = useState<number>(4);
  const [state, setState] = useState<IState>({
    welcome: false,
    name: null,
    avatar: undefined,
  })

  const WelcomeCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(1)
  const ImportCallback = (data: {next: boolean}) =>{
    if(data.next) setStep(2)
  }
  const PeopleCallback = (data: {next: boolean, name?: string}) => {
    if(data.name) setState({...state, name: data.name});
    if(data.next) setStep(3);
  }
  const PhotoCallback = (data: {next: boolean, avatar?: File | string | undefined}) => {
    if(data.avatar) setState({...state, avatar: data.avatar});
    if(data.next) setStep(4);
  }
  const PhoneCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(5)
  const CodeCallback = (e: React.MouseEvent<HTMLButtonElement>) => {console.log(e.target)}

  return (
    <div className={`flex flex-column align-center content-center flex-grow`}>
      <div className={`flex justify-center flex-column ${style.steps__frame}`}>
        {step === 0 && <Welcome callback={WelcomeCallback} />}
        {step === 1 && <Import callback={ImportCallback}/>}
        {step === 2 && <People callback={PeopleCallback}/>}
        {step === 3 && <Photo callback={PhotoCallback}/>}
        {step === 4 && <Phone callback={PhoneCallback}/>}
        {step === 5 && <Code callback={CodeCallback}/>}
      </div>
    </div>
  )
}

export default StepsAuth;