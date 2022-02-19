export enum TypeForm {
  Authorization = 'auth',
  Registration = 'registration',
}

export enum MessageErrorFormField {
  emptyField = 'Поле не заполнено!',
  fewLength = 'Не менее 8 символов',
  incorrectEmail = 'Невалидный e-mail адрес',
  nameUser = 'Имя должно быть не менее 3 символов',
}

export enum TypeMethodRequest {
  POST = 'post',
  PUT = 'put'
}

export enum TypeDifficultyWord {
  'easy',
  'medium',
  'hard',
}

export enum NameGame {
  AUDIOCALL = 'audiocall',
  SPRINT = 'sprint'
}