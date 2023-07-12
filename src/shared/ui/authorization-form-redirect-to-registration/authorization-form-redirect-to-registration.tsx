import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { AppRoutes } from '../../../constants/app-routes';
import { ReactComponent as ArrowR } from '../../assets/icons/arrow-r.svg';

export const AuthorizationFormRedirectToRegistration = () => (
  <Fragment>
    <span>Нет учётной записи?</span>
    <NavLink to={`/${AppRoutes.REGISTRATION}`}>
      Регистрация <ArrowR />
    </NavLink>
  </Fragment>
);
