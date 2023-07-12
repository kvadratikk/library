import { Fragment } from 'react';
import { FieldValues } from 'react-hook-form';

import { ValidationNames } from '../../../constants/validation-names';

import { WrappedTooltip } from './elems/wrapped-tooltip/wrapped-tooltip';
import { ErrorsTooltip } from './types/errors';
import { TooltipProps } from './types/tooltip-props';

import styles from './tooltip.module.scss';

const requiredText = 'Поле не может быть пустым';
const loginText = 'Используйте для логина латинский алфавит и цифры';
const passwordText = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
const phoneText = 'В формате +375 (xx) xxx-xx-xx';

const requiredError = {
  text: requiredText,
  isHighlighted: true,
};

const requiredErrors: ErrorsTooltip = {
  required: requiredError,
  tooltip: { text: '' },
};

const loginErrors: ErrorsTooltip = {
  checkOnlyNumbers: {
    text: (
      <Fragment>
        Используйте для логина <span className={styles.highlight}>латинский алфавит</span> и <span>цифры</span>
      </Fragment>
    ),
  },
  checkOnlyLetters: {
    text: (
      <Fragment>
        Используйте для логина <span>латинский алфавит</span> и <span className={styles.highlight}>цифры</span>
      </Fragment>
    ),
  },
  checkOther: {
    text: (
      <Fragment>
        Используйте для логина <span className={styles.highlight}>латинский алфавит</span> и{' '}
        <span className={styles.highlight}>цифры</span>
      </Fragment>
    ),
  },
  required: requiredError,
  tooltip: { text: loginText },
  blur: { text: loginText, isHighlighted: true },
};

const passwordErrors: ErrorsTooltip = {
  checkAll: {
    text: (
      <Fragment>
        Пароль <span className={styles.highlight}>не менее 8 символов</span>, с{' '}
        <span className={styles.highlight}>заглавной буквой</span> и <span className={styles.highlight}>цифрой</span>
      </Fragment>
    ),
  },
  checkLength: {
    text: (
      <Fragment>
        Пароль <span className={styles.highlight}>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
        <span>цифрой</span>
      </Fragment>
    ),
  },
  checkLengthWithNumber: {
    text: (
      <Fragment>
        Пароль <span className={styles.highlight}>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
        <span className={styles.highlight}>цифрой</span>
      </Fragment>
    ),
  },
  checkLetterAndNumber: {
    text: (
      <Fragment>
        Пароль <span>не менее 8 символов</span>, с <span className={styles.highlight}>заглавной буквой</span> и{' '}
        <span className={styles.highlight}>цифрой</span>
      </Fragment>
    ),
  },
  required: requiredError,
  tooltip: { text: passwordText },
  blur: { text: passwordText, isHighlighted: true },
};

const confirmationErrors: ErrorsTooltip = {
  required: requiredError,
  tooltip: { text: '' },
  match: { text: 'Пароли не совпадают', isHighlighted: true },
};

export const phoneErrors: ErrorsTooltip = {
  checkMask: { text: phoneText, isHighlighted: true },
  required: requiredError,
  tooltip: { text: phoneText },
};

export const emailErrors: ErrorsTooltip = {
  checkMask: { text: 'Введите корректный e-mail', isHighlighted: true },
  required: requiredError,
  tooltip: { text: '' },
  forgotTooltip: { text: 'На этот email будет отправлено письмо с инструкциями по восстановлению пароля' },
  errorMessage: { text: 'error', isHighlighted: true },
};

const Errors: Record<ValidationNames, ErrorsTooltip> = {
  [ValidationNames.LOGIN]: loginErrors,
  [ValidationNames.PASSWORD]: passwordErrors,
  [ValidationNames.USERNAME]: loginErrors,
  [ValidationNames.PASSWORD_CONFIRMATION]: confirmationErrors,
  [ValidationNames.IDENTIFIER]: requiredErrors,
  [ValidationNames.SURNAME]: requiredErrors,
  [ValidationNames.NAME]: requiredErrors,
  [ValidationNames.EMAIL]: emailErrors,
  [ValidationNames.PHONE]: phoneErrors,
};

export const Tooltip = <T extends FieldValues>({
  errors,
  name,
  isBlur = true,
  isBlurError,
  isNotMatch,
  isEmpty,
  errorMessage,
  forgot,
}: TooltipProps<T>) => {
  const currentErrors = Errors[name];
  const errorType = String(errors[name]?.type);
  const error = currentErrors[errorType];

  if (isBlurError) return <WrappedTooltip errorType={currentErrors.blur} />;
  if (errorType === 'required' && !isBlur) return <WrappedTooltip errorType={currentErrors.tooltip} />;
  if (errorMessage) return <WrappedTooltip errorType={emailErrors.errorMessage} />;

  if (error) return <WrappedTooltip errorType={error} />;
  if (isNotMatch) <WrappedTooltip errorType={confirmationErrors.match} />;

  return (
    <WrappedTooltip
      errorType={forgot ? emailErrors.forgotTooltip : isEmpty ? requiredErrors.tooltip : currentErrors.tooltip}
    />
  );
};
