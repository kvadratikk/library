import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoutes } from '../../../../constants/app-routes';
import { Code } from '../../../../types/loading';

import styles from './forgot-data.module.scss';

type ForgotDataProps = {
  code: Code;
};

export const ForgotData = ({ code }: ForgotDataProps) => {
  const isError = code === 400;
  const text = isError ? 'Восстановить?' : 'Забыли логин или пароль?';

  return (
    <NavLink to={`/${AppRoutes.FORGOT}`} className={styles.root}>
      <span className={classNames({ [styles.question]: isError })}>{text}</span>
    </NavLink>
  );
};
