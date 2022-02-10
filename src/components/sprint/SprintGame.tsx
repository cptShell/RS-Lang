import React, { useEffect, useState } from 'react';
import ResultRound from './ResultRound';
import { getFactorScore, getListQuestionWords } from '../../utils/functions/sprintGameFunctions';
import { ListQuestionData, SprintGameState, WordData } from '../../utils/interfaces/interfaces';
import { arr } from '../../assets/data';
import { DEFAULT_SPRINT_GAME_STATE, INIT_TIMER_SPRINT_GAME, MIN_FACTOR, START_LEVEL } from '../../utils/constants/constants';
import Timer from './Timer';

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

  const finishGame = (): void => {
    setStateSprint({ ...stateSprint, endGame: true });
  }

  // useEffect(() => {
  //   if (stateSprint.endGame) {
  //     console.log(result);
  //   }
  // }, [stateSprint.endGame]);

  return (
    <div>
      {stateSprint.endGame ? (
        <ResultRound result={result} />
      ) : (
        <>
          {<Timer initTime={INIT_TIMER_SPRINT_GAME} finishGame={finishGame}/>}
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
