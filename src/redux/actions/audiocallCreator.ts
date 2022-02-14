import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { BASE_APP_URL } from '../../utils/constants/constants';
import { WordData } from '../../utils/interfaces/interfaces';
import { BASE_HEADERS, START_AUDIOCALL, STATUS_200 } from '../constants';
import { ActionStartAudiocallGame } from '../types/types';

export const startGame = (startGame: boolean, listWords: WordData[]): ActionStartAudiocallGame => ({ type: START_AUDIOCALL, payload: {startGame, listWords} });

export function asyncGetListWords(numberGroup: string, controlButton?: (state: boolean) => void) {
  return async function (dispatch: ThunkDispatch<unknown, unknown, ActionStartAudiocallGame>) {
    if (controlButton) controlButton(true);
    try {
      const response = await <AxiosPromise<WordData[]>>axios({
        method: 'get',
        url: `${BASE_APP_URL}/words?group=${numberGroup}&page=2`,
        headers: BASE_HEADERS,
      });
      if (response.status === STATUS_200) {
        dispatch(startGame(true, response.data));
      }
    } catch {
      console.error('Can\'t get words to audiocall game');
    } finally {
      if (controlButton) controlButton(false);
    }
  };
}
