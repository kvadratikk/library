import { AppRoutes } from 'constants/app-routes';

import { AuthorizationModalWrapper } from 'shared/ui/authorization-modal-wrapper/authorization-modal-wrapper';

export const ResetModalSuccess = () => (
  <AuthorizationModalWrapper
    title='Новые данные сохранены'
    text='Зайдите в личный кабинет, используя логин и новый пароль'
    buttonText='Вход'
    link={AppRoutes.AUTH}
  />
);
