import { AppRoutes } from 'constants/app-routes';

import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ArrowR } from 'shared/assets/icons/arrow-r.svg';

export const RedirectToLogin = () => (
  <Fragment>
    <span>Есть учётная запись?</span>
    <NavLink to={`/${AppRoutes.AUTH}`}>
      войти
      <ArrowR />
    </NavLink>
  </Fragment>
);
