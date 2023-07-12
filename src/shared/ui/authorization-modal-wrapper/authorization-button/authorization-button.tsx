import { Button } from '../../button/button';

import styles from './authorization-button.module.scss';

type AuthorizationButtonProps = {
  buttonText?: string;
  onClick?: () => void;
};

export const AuthorizationButton = ({ buttonText, onClick }: AuthorizationButtonProps) => (
  <Button type='button' className={styles.root} onClick={onClick}>
    {buttonText}
  </Button>
);
