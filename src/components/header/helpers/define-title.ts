import { AppRoutes } from '../../../constants/app-routes';

enum Titles {
  LIBRARY = 'Библиотека',
  ACCOUNT = 'Личный кабинет',
}

export const defineTitle = (pathname: string) => {
  const title = pathname === `/${AppRoutes.PROFILE}` ? Titles.ACCOUNT : Titles.LIBRARY;

  return title;
};
