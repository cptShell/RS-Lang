import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, resetGame, finishGame, answeredAction, addCurrentScore } from '../../redux/actions/audiocallCreator';
import { RootState } from '../../redux/store';
import { BASE_APP_URL, ENTER_KEY, MAX_NUMBER_KEY, MIN_NUMBER_KEY, NUMPAD_ENTER_KEY, RIGHT_ANSWER_SCORE, SPACE_KEY } from '../../utils/constants/constants';
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
  const {
    audiocall: { counter, answered, score, tally, listQuestions, listResults, endGame },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onCheckAnswer = (isAnswerRight: boolean) => {
    const currentWordData = listQuestions[counter];
    dispatch(answeredAction(true));
    if (isAnswerRight) {
      !mute && playAudioRight();
      dispatch(addCurrentScore(score + RIGHT_ANSWER_SCORE, tally + 1));
    } else {
      !mute && playAudioFail();
      dispatch(addCurrentScore(score, 0));
    }

    if (counter <= listQuestions.length - 1) {
      setIsRight(isAnswerRight);
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
        if (isAnswerRight) {
          dispatch(finishGame(true, score + RIGHT_ANSWER_SCORE, tally + 1, listResults));
        } else {
          dispatch(finishGame(true, score, 0, listResults));
        }
      }
    }
  };

  const onNextQuestion = () => {
    dispatch(answeredAction(false));
    dispatch(nextQuestion(counter + 1, score, tally, listResults));
  };

  const onKeyHandler = (event: KeyboardEvent) => {
    const numberKey = Number(event.key);
    const codeKey = event.code;
    if(numberKey >= MIN_NUMBER_KEY && numberKey <= MAX_NUMBER_KEY && !answered) {
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
      dispatch(resetGame(false, false, 0, 0, false, 0));
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
