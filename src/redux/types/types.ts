import { ListQuestionData, ListQuestionsAudiocall } from '../../utils/interfaces/interfaces';
import { END_AUDIOCALL, NEXT_QUESTION_AUDIOCALL, RESET_AUDIOCALL, SET_DATA_USER, START_AUDIOCALL } from '../constants';
import { UserData } from './interfaces';

export type ActionSetDataUser = { type: typeof SET_DATA_USER; payload: UserData };

export type ActionStartAudiocallGame = { type: typeof START_AUDIOCALL; payload: {startGame: boolean, listQuestions: ListQuestionsAudiocall[]} };
export type ActionEndAudiocallGame = { type: typeof END_AUDIOCALL; payload: {endGame: boolean, results: ListQuestionData[]} };
export type ActionResetAudiocallGame = { type: typeof RESET_AUDIOCALL; payload: {startGame: boolean, endGame: boolean, counter: number} };
export type ActionNextQuestionAudiocallGame = { type: typeof NEXT_QUESTION_AUDIOCALL; payload: {counter: number, results: ListQuestionData[]} };

export type ActionAudiocallGame = ActionStartAudiocallGame | ActionResetAudiocallGame | ActionNextQuestionAudiocallGame | ActionEndAudiocallGame;