import { Validate } from 'react-hook-form';

import { ValidationNames } from '../../constants/validation-names';

const PASSWORD_LENGTH_CHAR = (value: string) => value.length < 8;
const PASSWORD_NUMBERS = (value: string) => /[\d]/g.test(value);
const PASSWORD_LETTERS = (value: string) => /[A-Z]/g.test(value);

const PASSWORD_ALL = (value: string) =>
  !(PASSWORD_LENGTH_CHAR(value) && !PASSWORD_NUMBERS(value) && !PASSWORD_LETTERS(value));
const PASSWORD_LENGTH_NUMBER = (value: string) =>
  !(PASSWORD_LENGTH_CHAR(value) && !PASSWORD_NUMBERS(value) && PASSWORD_LETTERS(value));
const PASSWORD_LENGTH = (value: string) =>
  !(PASSWORD_LENGTH_CHAR(value) && PASSWORD_NUMBERS(value) && PASSWORD_LETTERS(value));
const PASSWORD_LETTER_NUMBER = (value: string) => !(!PASSWORD_NUMBERS(value) || !PASSWORD_LETTERS(value));

const EMAIL_MASK =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const LOGIN_VALIDATION = {
  checkOnlyNumbers: (value: string) => {
    if (/^\d+$/gi.test(value)) return false;
    if (/[а-я]/gi.test(value) && /\d/gi.test(value)) return false;

    return true;
  },
  checkOnlyLetters: (value: string) => !/^[a-z]+$/gi.test(value),
  checkOther: (value: string) => {
    if (/[а-я]/gi.test(value) && !/\d/gi.test(value)) return false;

    return true;
  },
};

const PASSWORD_VALIDATION = {
  checkAll: (value: string) => PASSWORD_ALL(value),
  checkLengthWithNumber: (value: string) => PASSWORD_LENGTH_NUMBER(value),
  checkLength: (value: string) => PASSWORD_LENGTH(value),
  checkLetterAndNumber: (value: string) => PASSWORD_LETTER_NUMBER(value),
};

const EMAIL_VALIDATION = {
  checkMask: (value: string) => EMAIL_MASK.test(value),
};

const PHONE_VALIDATION = {
  checkMask: (value: string) => !/[x]/gi.test(value),
};

const Validation: Record<ValidationNames, object | null> = {
  [ValidationNames.LOGIN]: LOGIN_VALIDATION,
  [ValidationNames.PASSWORD]: PASSWORD_VALIDATION,
  [ValidationNames.PASSWORD_CONFIRMATION]: null,
  [ValidationNames.USERNAME]: LOGIN_VALIDATION,
  [ValidationNames.IDENTIFIER]: null,
  [ValidationNames.SURNAME]: null,
  [ValidationNames.NAME]: null,
  [ValidationNames.EMAIL]: EMAIL_VALIDATION,
  [ValidationNames.PHONE]: PHONE_VALIDATION,
};

type PickValidationArgs = ValidationNames;

export const pickValidation = <T>(name: PickValidationArgs) => Validation[name] as Validate<string, T>;
