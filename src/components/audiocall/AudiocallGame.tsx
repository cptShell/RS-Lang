import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, resetGame, finishGame, answeredAction } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';
import { BASE_APP_URL, ENTER_KEY, NUMPAD_ENTER_KEY, SPACE_KEY } from '../../utils/constants/constants';
import useAudio from '../../utils/hooks/useAudio';
import { ListQuestionData } from '../../utils/interfaces/interfaces';
import MuteButton from '../sprint/MuteButton';
import ResultRound from '../sprint/ResultRound';
import Audio from './Audio';

const Audiocall = () => {
  const play = useRef<HTMLButtonElement>(null);
  const [playAudioRight] = useAudio('./sounds/right.mp3');
  const [playAudioFail] = useAudio('./sounds/fail.mp3');
  const [mute, setMute] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<{ score: number; tally: number }>({ score: 0, tally: 0 });
  let {
    audiocall: { counter, answered, score, listQuestions, listResults, endGame },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onCheckAnswer = (isAnswerRight: boolean) => {
    const currentWordData = listQuestions[counter];
    dispatch(answeredAction(true));
    if (isAnswerRight) {
      !mute && playAudioRight();
    } else {
      !mute && playAudioFail();
    }

    if (counter <= listQuestions.length - 1) {
      setIsRight(isAnswerRight);
      if (isRight) {
        setCurrentScore({ score: currentScore.score + 10, tally: currentScore.tally + 1 });
      } else {
        setCurrentScore({ score: currentScore.score, tally: 0 });
      }

      const { id, word, audio, wordTranslate, group, rightTranslate } = currentWordData;
      const result: ListQuestionData = {
        id,
        word,
        audio,
        wordTranslate,
        group,
        rightTranslate,
        isRight: isAnswerRight,
      };
      listResults.push(result);
      if (counter === listQuestions.length - 1) {
        dispatch(finishGame(true, currentScore.score, currentScore.tally, listResults));
      }
    }
  };

  const onNextQuestion = () => {
    dispatch(answeredAction(false));
    dispatch(nextQuestion(counter + 1, currentScore.score, currentScore.tally, listResults));
  };

  const onKeyHandler = (event: KeyboardEvent) => {
    const numberKey = Number(event.key);
    const codeKey = event.code;
    if(numberKey >= 1 && numberKey <= 5 && !answered) {
      const isRightAnswer = listQuestions[counter].wordsAnswers[numberKey - 1].isRight;
      onCheckAnswer(isRightAnswer);
    }
    if (codeKey === SPACE_KEY) {
      play.current?.focus();
      play.current?.click();
    }
    if ((codeKey === ENTER_KEY || codeKey === NUMPAD_ENTER_KEY) && answered) {
      onNextQuestion();
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetGame(false, false, false, 0));
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyHandler, false);
    return () => window.removeEventListener('keydown', onKeyHandler, false);
  }, [counter, answered, endGame]);

  const listAnswers = listQuestions[counter].wordsAnswers.map((wordData, index) => (
    <li key={index}>
      <button
        onClick={onCheckAnswer.bind(null, wordData.isRight)}
        data-number={index + 1}
        className='audiocall__answer btn btn-secondary'
        disabled={answered}
      >{`${index + 1} ${wordData.wordTranslate}`}</button>
    </li>
  ));

  return (
    <div className='audiocall'>
      {endGame ? (
        <ResultRound result={listResults} score={score} />
      ) : (
      <>
        <div className='audiocall__header'>
            <MuteButton isMute={mute} setMute={setMute} />
          </div>
        <div className='audiocall__board'>
          <Audio ref={play} url={`${BASE_APP_URL}/${listQuestions[counter].audio}`} />
          <div className='audiocall__result'>
            {answered && (
              <h2 className={isRight ? 'alert alert-success' : 'alert alert-danger'}>{listQuestions[counter].word}</h2>
            )}
          </div>
          <ul className='audiocall__buttons'>{listAnswers}</ul>
          <button onClick={onNextQuestion} className='btn btn-success' disabled={!answered}>
            Дальше
          </button>
        </div>
      </>  
      )}
    </div>
  );
};

export default Audiocall;
