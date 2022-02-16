import { ListQuestionData, ListQuestionsAudiocall } from '../../utils/interfaces/interfaces';
import { ADD_SCORE_AUDIOCALL, ANSWERED_AUDIOCALL, END_AUDIOCALL, NEXT_QUESTION_AUDIOCALL, RESET_AUDIOCALL, SET_DATA_USER, START_AUDIOCALL } from '../constants';
import { UserData } from './interfaces';

export type ActionSetDataUser = { type: typeof SET_DATA_USER; payload: UserData };

export type ActionStartAudiocallGame = { type: typeof START_AUDIOCALL; payload: {startGame: boolean, listQuestions: ListQuestionsAudiocall[]} };
export type ActionEndAudiocallGame = { type: typeof END_AUDIOCALL; payload: {endGame: boolean,  score: number, tally: number, results: ListQuestionData[]} };
export type ActionResetAudiocallGame = { type: typeof RESET_AUDIOCALL; payload: {startGame: boolean, endGame: boolean, score: number, tally: number, answered: boolean, counter: number} };
export type ActionAnsweredAudiocallGame = { type: typeof ANSWERED_AUDIOCALL; payload: {answered: boolean} };
export type ActionNextQuestionAudiocallGame = { type: typeof NEXT_QUESTION_AUDIOCALL; payload: {counter: number, score: number, tally: number, results: ListQuestionData[]} };
export type ActionAddScoreAudiocallGame = { type: typeof ADD_SCORE_AUDIOCALL; payload: {score: number, tally: number} };

export type ActionAudiocallGame = ActionStartAudiocallGame | ActionResetAudiocallGame | ActionNextQuestionAudiocallGame | ActionEndAudiocallGame | ActionAnsweredAudiocallGame | ActionAddScoreAudiocallGame;