import { REG_EXP_EMAIL } from '../constants/constants';
import { MessageErrorFormField } from '../enum/enum';
import { ErrorsForm, ValuesAuth, ValuesRegistration } from '../interfaces/interfaces';

const checkEmail = (email: string, errors: ErrorsForm): ErrorsForm => {
  if (!email) {
    errors.email = MessageErrorFormField.emptyField;
  } else if (!REG_EXP_EMAIL.test(email)) {
    errors.email = MessageErrorFormField.incorrectEmail;
  }
  return errors;
};

const checkPassword = (password: string, errors: ErrorsForm): ErrorsForm => {
  if (!password) {
    errors.password = MessageErrorFormField.emptyField;
  } else if (password.length < 8) {
    errors.password = MessageErrorFormField.fewLength;
  }
  return errors;
};

const checkNameUser = (name: string, errors: ErrorsForm): ErrorsForm => {
  if (name.length < 3) {
    errors.name = MessageErrorFormField.nameUser;
  }
  return errors;
};

export const validateAuthorization = (values: ValuesAuth) => {
  const errors: ErrorsForm = {};
  return { ...checkEmail(values.email, errors), ...checkPassword(values.password, errors) };
};

export const validateRegistration = (values: ValuesRegistration) => {
  const errors: ErrorsForm = {};
  return {
    ...checkEmail(values.email, errors),
    ...checkPassword(values.password, errors),
    ...checkNameUser(values.name, errors),
  };
};