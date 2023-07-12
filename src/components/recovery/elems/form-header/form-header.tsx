import { AppRoutes } from 'constants/app-routes';

import { NavLink } from 'react-router-dom';
import { ReactComponent as ArrowL } from 'shared/assets/icons/arrow-l.svg';

import styles from './form-header.module.scss';

export const FormHeader = () => (
  <NavLink to={`/${AppRoutes.AUTH}`} className={styles.root}>
    <ArrowL />
    <span>вход в личный кабинет</span>
  </NavLink>
);
