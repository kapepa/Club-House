import React, {FC, useRef, useState} from "react";
import style from "./steps.auth.module.scss";
import Button from "../button";
import Link from "next/link";

interface ICode {
  callback(data: {next: boolean, code?: number}): void,
}

interface IStateCode {
  one: number | null,
  two: number | null,
  three: number | null,
  four: number | null,
}

const Code: FC<ICode> = ({callback}) => {
  const oneRef = useRef<HTMLInputElement | null>(null);
  const twoRef = useRef<HTMLInputElement | null>(null);
  const threeRef = useRef<HTMLInputElement | null>(null);
  const fourRef = useRef<HTMLInputElement | null>(null);
  const [code, setCode] = useState<IStateCode>({
    one: null,
    two: null,
    three: null,
    four: null,
  });

  const ConfirmedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const joinCode = Number(Object.values(code).join(''));
    if(!isNaN(joinCode)){
      callback({next: true, code: joinCode});
    } else {
      callback({next: false});
    }
  }

  const ChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(e.currentTarget.value).split('').pop();
    const name = e.currentTarget.name;

    for(let key of Object.entries(code)){
      if (key[0] === name) continue;
      if (key[1] === null) {
        if(key[0] === "one" && oneRef.current) oneRef.current?.focus();
        if(key[0] === "two" && oneRef.current) twoRef.current?.focus();
        if(key[0] === "three" && oneRef.current) threeRef.current?.focus();
        if(key[0] === "four" && oneRef.current) fourRef.current?.focus();
        break;
      }
    }

    setCode({...code, [name]: isNaN(Number(value)) ? null : Number(value)})
  }

  return(
    <>
      <div className={`flex justify-center flex-column ${style.steps__cap}`}>
        <h3 className={`${style.steps__h3} ${style.steps__code}`}>Enter your active code!</h3>
      </div>
      <div className={`flex justify-center ${style.steps__content}`}>
        <input
          type="number"
          name="one"
          className={style.steps__input_number}
          placeholder="_"
          onChange={ChangeField}
          value={code.one ? code.one : ''}
          ref={oneRef}
        />
        <input
          type="number"
          name="two"
          className={style.steps__input_number}
          placeholder="_"
          onChange={ChangeField}
          value={code.two ? code.two : ''}
          ref={twoRef}
        />
        <input
          type="number"
          name="three"
          className={style.steps__input_number}
          placeholder="_"
          onChange={ChangeField}
          value={code.three ? code.three : ''}
          ref={threeRef}
        />
        <input
          type="number"
          name="four"
          className={style.steps__input_number}
          placeholder="_"
          onChange={ChangeField}
          value={code.four ? code.four : ''}
          ref={fourRef}
        />
      </div>
      <div className="flex justify-center">
        <Button name="Confirmed" callback={ConfirmedClick} disabled={Object.values(code).includes(null)}/>
      </div>
      <div className={`flex justify-center ${style.steps__basement}`}>
        <Link href="/trycode">
          <a className={`${style.steps__anchor}`}>Try entering your code</a>
        </Link>
      </div>
    </>
  )
}

export default Code;