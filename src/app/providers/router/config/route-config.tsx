import { Navigate, RouteProps } from 'react-router-dom';

import { AppRoutes } from '../../../../constants/app-routes';
import { AgreementPage } from '../../../../pages/agreement-page/agreement-page';
import { AuthorizationPage } from '../../../../pages/authorization-page/authorization-page';
import { BookPage } from '../../../../pages/book-page/book-page';
import { MainPage } from '../../../../pages/main-page/main-page';
import { ProfilePage } from '../../../../pages/profile-page/profile-page';
import { RecoveryPage } from '../../../../pages/recovery-page/recovery-page';
import { RegistrationPage } from '../../../../pages/registration-page/registration-page';
import { TermsPage } from '../../../../pages/terms-page/terms-page';

type RouteConfigProps = RouteProps & {
  element: JSX.Element;
  elementAuth: JSX.Element;
};

const NavigateAuth = <Navigate to={`/${AppRoutes.AUTH}`} />;
const NavigateBooks = <Navigate to={`/${AppRoutes.BOOKS}`} />;

export const routeConfig: RouteConfigProps[] = [
  {
    path: AppRoutes.DEFAULT,
    element: NavigateAuth,
    elementAuth: NavigateBooks,
  },
  {
    path: AppRoutes.AUTH,
    element: <AuthorizationPage />,
    elementAuth: NavigateBooks,
  },
  {
    path: AppRoutes.REGISTRATION,
    element: <RegistrationPage />,
    elementAuth: NavigateBooks,
  },
  {
    path: AppRoutes.FORGOT,
    element: <RecoveryPage />,
    elementAuth: NavigateBooks,
  },
  {
    path: AppRoutes.PROFILE,
    element: NavigateAuth,
    elementAuth: <ProfilePage />,
  },
  {
    path: AppRoutes.AGREEMENT,
    element: NavigateAuth,
    elementAuth: <AgreementPage />,
  },
  {
    path: AppRoutes.TERMS,
    element: NavigateAuth,
    elementAuth: <TermsPage />,
  },
  {
    path: AppRoutes.BOOK_CATEGORY,
    element: NavigateAuth,
    elementAuth: <MainPage />,
  },
  {
    path: AppRoutes.BOOK,
    element: NavigateAuth,
    elementAuth: <BookPage />,
  },
];
