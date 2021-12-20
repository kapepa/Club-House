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
}

const StepsAuth: FC = () => {
  const [step, setStep] = useState<number>(0);
  const [state, setState] = useState<IState>({
    welcome: false,
  })

  const WelcomeCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(1)
  const ImportCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(2)
  const PeopleCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(3)
  const PhotoCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(4)
  const PhoneCallback = (e: React.MouseEvent<HTMLButtonElement>) => setStep(5)

  return (
    <div className={`flex flex-column align-center content-center flex-grow`}>
      <div className={`flex justify-center flex-column ${style.steps__frame}`}>
        {step === 0 && <Welcome callback={WelcomeCallback} />}
        {step === 1 && <Import callback={ImportCallback}/>}
        {step === 2 && <People callback={PeopleCallback}/>}
        {step === 3 && <Photo callback={PhotoCallback}/>}
        {step === 4 && <Phone callback={PhoneCallback}/>}
        {step === 5 && <Code/>}
      </div>
    </div>
  )
}

export default StepsAuth;