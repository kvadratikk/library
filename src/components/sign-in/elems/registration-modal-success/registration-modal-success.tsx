import { AppRoutes } from 'constants/app-routes';

import { AuthorizationModalWrapper } from 'shared/ui/authorization-modal-wrapper/authorization-modal-wrapper';

export const RegistrationModalSuccess = () => (
  <AuthorizationModalWrapper
    title='Регистрация успешна'
    text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
    link={AppRoutes.AUTH}
    buttonText='Вход'
  />
);
