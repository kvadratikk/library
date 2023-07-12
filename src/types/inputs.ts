import { ValidationNames } from '../constants/validation-names';

type UserInputs = {
  [ValidationNames.PASSWORD]: string;
  [ValidationNames.NAME]: string;
  [ValidationNames.SURNAME]: string;
  [ValidationNames.PHONE]: string;
  [ValidationNames.EMAIL]: string;
};

export type RegInputs = UserInputs & {
  [ValidationNames.USERNAME]: string;
};

export type ProfileInputs = UserInputs & {
  [ValidationNames.LOGIN]: string;
};

export type AuthInputs = {
  [ValidationNames.IDENTIFIER]: string;
  [ValidationNames.PASSWORD]: string;
};

export type EmailInputs = {
  [ValidationNames.EMAIL]: string;
};

export type PasswordsInputs = {
  [ValidationNames.PASSWORD]: string;
  [ValidationNames.PASSWORD_CONFIRMATION]: string;
};

export type PasswordsInputsWithCode = PasswordsInputs & {
  code: string;
};
