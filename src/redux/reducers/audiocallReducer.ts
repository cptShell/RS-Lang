import {  ActionStartAudiocallGame } from '../types/types';
import { START_AUDIOCALL } from '../constants';
import { StateAudiocallGame } from '../types/interfaces';

const DEFAULT_STATE_AUDIOCALL_GAME: StateAudiocallGame = {
  startGame: false,
  endGame: false,
  listWords: [],
}

export default function audiocallReducer(state = DEFAULT_STATE_AUDIOCALL_GAME, action: ActionStartAudiocallGame) {
  switch (action.type) {
    case START_AUDIOCALL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}