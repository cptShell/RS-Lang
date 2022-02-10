import React, { useEffect, useState } from 'react';
import ResultRound from './ResultRound';
import { getFactorScore, getListQuestionWords } from '../../utils/functions/sprintGameFunctions';
import { ListQuestionData, SprintGameState, WordData } from '../../utils/interfaces/interfaces';
import { arr } from '../../assets/data';
import {
  BASE_APP_URL,
  DEFAULT_SPRINT_GAME_STATE,
  INIT_TIMER_SPRINT_GAME,
  LEFT_KEY,
  MIN_FACTOR,
  RIGHT_KEY,
  START_LEVEL,
} from '../../utils/constants/constants';
import Timer from './Timer';
import useAudio from '../../utils/hooks/useAudio';
import PlayButton from './AudioButton';

const SprintGame: React.FC<{ listWords: WordData[] }> = (props) => {
  const [ playAudioRight ] = useAudio('./sounds/right.mp3');
  const [ playAudioFail ] = useAudio('./sounds/fail.mp3');
  const [stateSprint, setStateSprint] = useState<SprintGameState>(DEFAULT_SPRINT_GAME_STATE);
  let { factor, level, score, counter, endGame } = stateSprint;
  const [listQuestionsWords] = useState<ListQuestionData[]>(JSON.parse(arr));
  const [result, setResult] = useState<ListQuestionData[]>([]);

  const { word, wordTranslate, audio } = listQuestionsWords[counter];

  const onCheckAnswer = (answer: boolean) => {
    const currentWord = { ...listQuestionsWords[counter] };
    const isRightAnswer = answer === currentWord.isRight;
    if (isRightAnswer) {
      playAudioRight();
      level = level + 1;
      factor = getFactorScore(level);
      score = score + factor;
      currentWord.isRight = true;
    } else {
      playAudioFail();
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
  };

  const onKeyArrowHandler = (event: KeyboardEvent) => {
    if (event.code === LEFT_KEY && !stateSprint.endGame) {
      onCheckAnswer(true);
    }
    if (event.key === RIGHT_KEY && !stateSprint.endGame) {
      onCheckAnswer(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyArrowHandler, false);
    return () => window.removeEventListener('keydown', onKeyArrowHandler, false);
  }, [counter, endGame]);

  return (
    <div>
      {stateSprint.endGame ? (
        <ResultRound result={result} />
      ) : (
        <>
          {<Timer initTime={INIT_TIMER_SPRINT_GAME} finishGame={finishGame} />}
          <h1>
            Score: {score} <span>+{factor}</span>
          </h1>
          <h1>Level: {level}</h1>
          <h1>Word: {word}</h1>
          {<PlayButton url={`${BASE_APP_URL}/${audio}`}/>}
          <h1>Translate: {wordTranslate}</h1>
          <div>
            <button onClick={onCheckAnswer.bind(null, true)}>right</button>
            <button onClick={onCheckAnswer.bind(null, false)}>wrong</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SprintGame;
