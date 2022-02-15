import { WordData } from '../../utils/interfaces/interfaces';
import { RESET_AUDIOCALL, SET_DATA_USER, START_AUDIOCALL } from '../constants';
import { UserData } from './interfaces';

export type ActionSetDataUser = { type: typeof SET_DATA_USER; payload: UserData };

export type ActionStartAudiocallGame = { type: typeof START_AUDIOCALL; payload: {startGame: boolean, listWords: WordData[]} };
export type ActionResetAudiocallGame = { type: typeof RESET_AUDIOCALL; payload: {startGame: boolean} };

export type ActionAudiocallGame = ActionStartAudiocallGame | ActionResetAudiocallGame;