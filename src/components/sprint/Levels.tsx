import React, { MouseEvent } from 'react';
import { SPRINT_LEVEL_DATA } from '../../utils/constants/constants';
import { NameGame } from '../../utils/enum/enum';
import DescriptionSprint from './DescriptionSprint';
import DescriptionAudiocall from '../audiocall/DescriptionAudiocall';

type HandlerSelectLevel = (event: MouseEvent<HTMLButtonElement>) => Promise<void>;

const Levels: React.FC<{ handlerSelectLevel: HandlerSelectLevel; nameGame: NameGame }> = ({
  handlerSelectLevel,
  nameGame,
}) => {
  const listButtons = SPRINT_LEVEL_DATA.map((data) => {
    return (
      <p key={data.nameLevel} className='sprint-level'>
        <button onClick={handlerSelectLevel} data-number={data.level}>
          {data.nameLevel}
        </button>
      </p>
    );
  });

  return (
    <>
    {nameGame === NameGame.SPRINT ? <DescriptionSprint /> : <DescriptionAudiocall />}
      <div className='sprint-levels'>{listButtons}</div>
    </>
  );
};

export default Levels;
