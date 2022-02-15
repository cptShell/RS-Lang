import { ActionAudiocallGame } from '../types/types';
import { NEXT_QUESTION_AUDIOCALL, RESET_AUDIOCALL, START_AUDIOCALL } from '../constants';
import { StateAudiocallGame } from '../types/interfaces';

const DEFAULT_STATE_AUDIOCALL_GAME: StateAudiocallGame = {
  startGame: false,
  endGame: false,
  counter: 0,
  listQuestions: [],
};

export default function audiocallReducer(state = DEFAULT_STATE_AUDIOCALL_GAME, action: ActionAudiocallGame) {
  switch (action.type) {
    case START_AUDIOCALL:
      return { ...state, ...action.payload };
    case RESET_AUDIOCALL:
      return { ...state, ...action.payload };
    case NEXT_QUESTION_AUDIOCALL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
