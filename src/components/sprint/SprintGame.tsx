import React, { useEffect, useState } from 'react';
import { getFactorScore, getListQuestionWords } from '../../utils/functions/sprintGameFunctions';
import { ListQuestionData, SprintGameState, WordData } from '../../utils/interfaces/interfaces';
import { arr } from '../../assets/data';
import { DEFAULT_SPRINT_GAME_STATE, MIN_FACTOR } from '../../utils/constants/constants';

const SprintGame: React.FC<{ listWords: WordData[] }> = (props) => {
  const [stateSprint, setStateSprint] = useState<SprintGameState>(DEFAULT_SPRINT_GAME_STATE);
  let { factor, level, score, counter } = stateSprint;
  const [listQuestionsWords] = useState<ListQuestionData[]>(JSON.parse(arr));
  const { word, wordTranslate } = listQuestionsWords[counter];

  const onCheckAnswer = (answer: boolean) => {
    const isRightAnswer = answer === listQuestionsWords[counter].isRight;
    if (isRightAnswer) {
      level = level + 1;
      factor = getFactorScore(level);
      score = score + factor;
    } else {
      level = 0;
      factor = MIN_FACTOR;
    }
    if (counter <= listQuestionsWords.length - 1) {
      console.log('push result', counter);
      
      if (counter === listQuestionsWords.length - 1) {
        setStateSprint({ ...stateSprint, score, factor, level, endGame: true });
        return;
      }
      setStateSprint({ ...stateSprint, counter: counter + 1, score, factor, level });
    }
  };
  useEffect(() => {
    if (stateSprint.endGame) {
      alert('end');
    }
  }, [stateSprint.endGame]);

  return (
    <div>
      <h1>
        Score: {score} <span>+{factor}</span>
      </h1>
      <h1>Level: {level}</h1>
      <h1>Word: {word}</h1>
      <h1>Translate: {wordTranslate}</h1>
      <div>
        <button onClick={onCheckAnswer.bind(null, true)} data-right=''>
          right
        </button>
        <button onClick={onCheckAnswer.bind(null, false)}>wrong</button>
      </div>
    </div>
  );
};

export default SprintGame;
