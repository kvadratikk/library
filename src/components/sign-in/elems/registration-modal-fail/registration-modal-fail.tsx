import { AuthorizationModalWrapper } from 'shared/ui/authorization-modal-wrapper/authorization-modal-wrapper';

type RegistrationModalFailProps = {
  onClick: () => void;
};

export const RegistrationModalFail = ({ onClick }: RegistrationModalFailProps) => (
  <AuthorizationModalWrapper
    title='Данные не сохранились'
    text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
    buttonText='Повторить'
    onClick={onClick}
  />
);
