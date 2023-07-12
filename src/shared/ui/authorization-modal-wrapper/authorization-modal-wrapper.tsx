import { NavLink } from 'react-router-dom';

import { AppRoutes } from '../../../constants/app-routes';

import { AuthorizationButton } from './authorization-button/authorization-button';

import styles from './authorization-modal-wrapper.module.scss';

type AuthorizationModalWrapperProps = {
  title: string;
  text: string;
  buttonText?: string;
  onClick?: () => void;
  link?: AppRoutes;
};

export const AuthorizationModalWrapper = ({
  title,
  text,
  buttonText,
  onClick,
  link,
}: AuthorizationModalWrapperProps) => (
  <div className={styles.root} data-test-id='status-block'>
    <div className={styles.top}>
      <h4>{title}</h4>
    </div>

    <div className={styles.text}>{text}</div>

    {link && buttonText && (
      <NavLink to={`/${link}`}>
        <AuthorizationButton onClick={onClick} buttonText={buttonText} />
      </NavLink>
    )}

    {!link && buttonText && <AuthorizationButton onClick={onClick} buttonText={buttonText} />}
  </div>
);
