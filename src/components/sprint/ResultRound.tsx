import React from 'react';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { ListQuestionData } from '../../utils/interfaces/interfaces';
import PlayButton from './AudioButton';

const ResultRound: React.FC<{result: ListQuestionData[]}> = ({ result }) => {
  const listResult = result.map((word) => (
    <li key={word.id}>
      <PlayButton url={`${BASE_APP_URL}/${word.audio}`} />
      <span>{word.word}</span>
      <span>{word.wordTranslate}</span>
      <span>{word.isRight ? 'Знаю' : 'Ошибок'}</span>
    </li>
  ));
  return (
    <div className='sprint-result'>
      <ul>
        {listResult}
      </ul>
    </div>
  );
}

export default ResultRound;