import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { ListQuestionsAudiocall, WordData } from '../../utils/interfaces/interfaces';
import { getListAnswersAudiocall } from '../../utils/functions/audiocallGameFunctions';
import { BASE_HEADERS, NEXT_QUESTION_AUDIOCALL, RESET_AUDIOCALL, START_AUDIOCALL, STATUS_200 } from '../constants';
import { ActionNextQuestionAudiocallGame, ActionResetAudiocallGame, ActionStartAudiocallGame } from '../types/types';

export const startGame = (startGame: boolean, listQuestions: ListQuestionsAudiocall[]): ActionStartAudiocallGame => ({ type: START_AUDIOCALL, payload: {startGame, listQuestions} });
export const resetGame = (startGame: boolean, counter: number): ActionResetAudiocallGame => ({ type: RESET_AUDIOCALL, payload: {startGame, counter} });

export const nextQuestion = (counter: number): ActionNextQuestionAudiocallGame => ({ type: NEXT_QUESTION_AUDIOCALL, payload: {counter} });

export function asyncGetListWords(numberGroup: string, page: string, controlButton?: (state: boolean) => void) {
  return async function (dispatch: ThunkDispatch<unknown, unknown, ActionStartAudiocallGame>) {
    if (controlButton) controlButton(true);
    try {
      const response = await <AxiosPromise<WordData[]>>axios({
        method: 'get',
        url: `${BASE_APP_URL}/words?group=${numberGroup}&page=${page}`,
        headers: BASE_HEADERS,
      });
      if (response.status === STATUS_200) {
        const listQuestions = await getListAnswersAudiocall(response.data, numberGroup);
        console.log(listQuestions);
        dispatch(startGame(true, listQuestions));
      }
    } catch {
      console.error('Can\'t get words to audiocall game');
    } finally {
      if (controlButton) controlButton(false);
    }
  };
}
