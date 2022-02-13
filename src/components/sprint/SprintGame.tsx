import React, { useEffect, useState } from 'react';
import ResultRound from './ResultRound';
import { getFactorScore, getListQuestionWords } from '../../utils/functions/sprintGameFunctions';
import { ListQuestionData, SprintGameState, WordData } from '../../utils/interfaces/interfaces';
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
import MuteButton from './MuteButton';

const SprintGame: React.FC<{ listWords: WordData[] }> = (props) => {
  const [playAudioRight] = useAudio('./sounds/right.mp3');
  const [playAudioFail] = useAudio('./sounds/fail.mp3');
  const [stateSprint, setStateSprint] = useState<SprintGameState>(DEFAULT_SPRINT_GAME_STATE);
  let { factor, level, score, counter, endGame } = stateSprint;
  const [listQuestionsWords] = useState<ListQuestionData[]>(getListQuestionWords(props.listWords));
  const [result, setResult] = useState<ListQuestionData[]>([]);
  const [mute, setMute] = useState<boolean>(false);

  if (!listQuestionsWords) {
    setStateSprint({...stateSprint, endGame: true});
  }

  const { word, wordTranslate, audio } = listQuestionsWords[counter];

  const onCheckAnswer = (answer: boolean) => {
    const currentWord = { ...listQuestionsWords[counter] };
    const isRightAnswer = answer === currentWord.isRight;
    if (isRightAnswer) {
      !mute && playAudioRight();
      level = level + 1;
      factor = getFactorScore(level);
      score = score + factor;
      currentWord.isRight = true;
    } else {
      !mute && playAudioFail();
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
    <div className='sprint'>
      {stateSprint.endGame ? (
        <ResultRound result={result} score={score}/>
        // <ResultRound result={arr} score={100}/>
      ) : (
        <div className='sprint-board'>
          <div className='sprint-board__header'>
            <Timer initTime={INIT_TIMER_SPRINT_GAME} finishGame={finishGame} />
            <MuteButton isMute={mute} setMute={setMute} />
          </div>
          <p className='sprint-score'>Счет: {score}</p>
          <div className='sprint-board__field'>
            <span>+{factor} за очков слово</span>
            <h2 className='sprint-word'>{word}</h2>
            <PlayButton url={`${BASE_APP_URL}/${audio}`} />
            <h3 className='sprint-translate'>{wordTranslate}</h3>
            <div className='sprint-buttons'>
              <button className='btn btn-success' onClick={onCheckAnswer.bind(null, true)}>
                right
              </button>
              <button className='btn btn-danger' onClick={onCheckAnswer.bind(null, false)}>
                wrong
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SprintGame;
