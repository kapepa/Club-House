import React, {FC} from 'react';
import style from './nav.dot.module.scss';

enum EPosition {
  column,
  row
}

interface INavDot {
  postion: keyof typeof EPosition,
  maxDot: number,
  activeDot: number,
  callback(dot: number): void,
  classes?: string,
}

const NavDot: FC<INavDot> = ({postion, activeDot, maxDot, callback , classes = ''}) => {
  const dots = Array(maxDot).fill(undefined);
  return (
    <div className={`${style.nav_dots} ${classes} ${postion === 'column' ? 'flex-column' : ''} flex content-center`}>
      {dots.map((dot, i) => {
        return (
          <div
            key={`dot-${i}`}
            onClick={(e: React.MouseEvent<HTMLElement>) => {callback(i)}}
            className={`${style.nav_dots__dot} ${activeDot === i ? style.nav_dots__active : ''} pointer`}
          />
        )
      })}
    </div>
  )
};

export default NavDot;
