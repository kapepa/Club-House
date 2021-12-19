import React, {FC} from "react";
import Link from 'next/link';
import Image from 'next/image';
import LogoSVG from '../../public/svg/Clubhouse.svg';
import style from './logo.module.scss';

const Logo: FC = () => {
  return (
    <Link href="/home">
      <a className={`flex align-center`}>
        <Image
          src={LogoSVG}
          alt="Logo"
          className={style.logo__image}
          width={60}
          height={60}
        />
        <Link href="/home">
          <span className={style.logo__span}>Clubhouse</span>
        </Link>
      </a>
    </Link>
  )
}

export default Logo;