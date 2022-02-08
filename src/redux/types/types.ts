import { SET_DATA_USER } from '../constants';
import { UserData } from './interfaces';

export type ActionSetDataUser = { type: typeof SET_DATA_USER; payload: UserData };
