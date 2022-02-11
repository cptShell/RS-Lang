import React, { MouseEvent } from 'react';
import { SPRINT_LEVEL_DATA } from '../../utils/constants/constants';

type HandlerSelectLevel = (event: MouseEvent<HTMLButtonElement>) => Promise<void>

const Levels: React.FC<{handlerSelectLevel: HandlerSelectLevel}> = ({handlerSelectLevel}) => {
  const listButtons = SPRINT_LEVEL_DATA.map(data => {
    return (
      <p key={data.nameLevel} className='sprint-level'>
        <button onClick={handlerSelectLevel} data-number={data.level}>{data.nameLevel}</button>
      </p>
    );
  });

  return (
    <div className='sprint-levels'>
      {listButtons}
    </div>
  );
}

export default Levels;