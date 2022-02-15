import { ListQuestionsAudiocall } from "../../utils/interfaces/interfaces";

export interface UserData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface StateAudiocallGame {
  startGame: boolean,
  endGame: boolean,
  listQuestions: ListQuestionsAudiocall[]
}
