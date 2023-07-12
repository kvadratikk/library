import { AuthorizationModalWrapper } from 'shared/ui/authorization-modal-wrapper/authorization-modal-wrapper';

type ResetModalFailProps = {
  onClick: () => void;
};

export const ResetModalFail = ({ onClick }: ResetModalFailProps) => (
  <AuthorizationModalWrapper
    title='Данные не сохранились'
    text='Что-то пошло не так. Попробуйте ещё раз'
    buttonText='Повторить'
    onClick={onClick}
  />
);
