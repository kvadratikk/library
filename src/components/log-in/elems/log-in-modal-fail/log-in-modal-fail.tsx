import { AuthorizationModalWrapper } from 'shared/ui/authorization-modal-wrapper/authorization-modal-wrapper';

type LogInModalFailProps = {
  onClick: () => void;
};

export const LogInModalFail = ({ onClick }: LogInModalFailProps) => (
  <AuthorizationModalWrapper
    title='Вход не выполнен'
    text='Что-то пошло не так. Попробуйте ещё раз'
    buttonText='Повторить'
    onClick={onClick}
  />
);
