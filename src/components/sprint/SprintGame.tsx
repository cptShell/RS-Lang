import React, { MouseEvent } from 'react';
import { getListQuestionWords } from '../../utils/functions/sprintGameFunctions';
import { WordData } from '../../utils/interfaces/interfaces';

const SprintGame: React.FC<{ listWords: WordData[] }> = (props) => {
  const listQuestionsWords = getListQuestionWords(props.listWords);

  const list = props.listWords.map((wordData) => <li key={wordData.id}>{wordData.word}</li>);
  return <ul>{list}</ul>;
};

export default SprintGame;
