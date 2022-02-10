import React, { useEffect, useState } from 'react';
import { getFactorScore, getListQuestionWords } from '../../utils/functions/sprintGameFunctions';
import { ListQuestionData, SprintGameState, WordData } from '../../utils/interfaces/interfaces';
import { arr } from '../../assets/data';
import { BASE_APP_URL, DEFAULT_SPRINT_GAME_STATE, MIN_FACTOR, START_LEVEL } from '../../utils/constants/constants';
import Player from './AudioButton';

const SprintGame: React.FC<{ listWords: WordData[] }> = (props) => {
  const [stateSprint, setStateSprint] = useState<SprintGameState>(DEFAULT_SPRINT_GAME_STATE);
  let { factor, level, score, counter } = stateSprint;
  const [listQuestionsWords] = useState<ListQuestionData[]>(JSON.parse(arr));
  const [result, setResult] = useState<ListQuestionData[]>([]);

  const { word, wordTranslate } = listQuestionsWords[counter];

  const onCheckAnswer = (answer: boolean) => {
    const currentWord = { ...listQuestionsWords[counter] };
    const isRightAnswer = answer === currentWord.isRight;
    if (isRightAnswer) {
      level = level + 1;
      factor = getFactorScore(level);
      score = score + factor;
      currentWord.isRight = true;
    } else {
      level = START_LEVEL;
      factor = MIN_FACTOR;
      currentWord.isRight = false;
    }
    if (counter <= listQuestionsWords.length - 1) {
      setResult([...result, currentWord]);
      if (counter === listQuestionsWords.length - 1) {
        setStateSprint({ ...stateSprint, score, factor, level, endGame: true });
        return;
      }
      setStateSprint({ ...stateSprint, counter: counter + 1, score, factor, level });
    }
  };
  useEffect(() => {
    if (stateSprint.endGame) {
      console.log(result);
    }
  }, [stateSprint.endGame]);

  const listResult = result.map((word) => (
    <li key={word.id}>
      <Player url={`${BASE_APP_URL}/${word.audio}`} />
      <span>{word.word}</span>
      <span>{word.wordTranslate}</span>
      <span>{word.isRight ? 'Знаю' : 'Ошибок'}</span>
    </li>
  ));

  return (
    <div>
      {stateSprint.endGame ? (
        <ul>{listResult}</ul>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SprintGame;
