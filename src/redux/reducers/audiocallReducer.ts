import { ActionAudiocallGame } from '../types/types';
import { ANSWERED_AUDIOCALL, END_AUDIOCALL, NEXT_QUESTION_AUDIOCALL, RESET_AUDIOCALL, START_AUDIOCALL } from '../constants';
import { StateAudiocallGame } from '../types/interfaces';

const DEFAULT_STATE_AUDIOCALL_GAME: StateAudiocallGame = {
  startGame: false,
  endGame: false,
  answered: false,
  tally: 0,
  score: 0,
  counter: 0,
  listQuestions: [],
  listResults: [],
};

export default function audiocallReducer(state = DEFAULT_STATE_AUDIOCALL_GAME, action: ActionAudiocallGame) {
  switch (action.type) {
    case START_AUDIOCALL:
      return { ...state, ...action.payload };
    case RESET_AUDIOCALL:
      return { ...state, ...action.payload, listResults: [] };
    case ANSWERED_AUDIOCALL: 
      return { ...state, answered: action.payload.answered };
    case NEXT_QUESTION_AUDIOCALL:
      return {
        ...state,
        counter: action.payload.counter,
        score: action.payload.score,
        tally: action.payload.tally,
        listResults: action.payload.results,
      };
    case END_AUDIOCALL:
      return {
        ...state,
        endGame: action.payload.endGame,
        score: action.payload.score,
        tally: action.payload.tally,
        listResults: action.payload.results,
      };
    default:
      return state;
  }
}
