import { ActionAudiocallGame } from '../types/types';
import { RESET_AUDIOCALL, START_AUDIOCALL } from '../constants';
import { StateAudiocallGame } from '../types/interfaces';

const DEFAULT_STATE_AUDIOCALL_GAME: StateAudiocallGame = {
  startGame: false,
  endGame: false,
  listQuestions: [],
};

export default function audiocallReducer(state = DEFAULT_STATE_AUDIOCALL_GAME, action: ActionAudiocallGame) {
  switch (action.type) {
    case START_AUDIOCALL:
      return { ...state, ...action.payload };
    case RESET_AUDIOCALL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
