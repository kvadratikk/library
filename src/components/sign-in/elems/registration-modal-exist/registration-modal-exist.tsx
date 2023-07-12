import { AppRoutes } from 'constants/app-routes';

import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { AuthorizationModalWrapper } from 'shared/ui/authorization-modal-wrapper/authorization-modal-wrapper';
import { resetRegistration } from 'store/slices/registration-slice';

export const RegistrationModalExist = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(resetRegistration());
  };

  return (
    <AuthorizationModalWrapper
      title='Данные не сохранились'
      text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
      link={AppRoutes.REGISTRATION}
      buttonText='Назад к регистрации'
      onClick={handleClick}
    />
  );
};
