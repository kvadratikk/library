import { AppRoutes } from 'constants/app-routes';

import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { setIsExpandedMenu } from 'store/slices/menu-slice';

import styles from './navbar-link.module.scss';

type NavbarLinkProps = {
  testId?: string;
  link: AppRoutes;
  text: string;
  onClick?: () => void;
  Icon?: JSX.Element;
};

export const NavbarLink = ({ testId, link, text, onClick, Icon }: NavbarLinkProps) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const handleClick = () => {
    dispatch(setIsExpandedMenu(false));
  };

  const defineActiveLink = () => (link === AppRoutes.BOOKS && pathname.includes('books')) || pathname === `/${link}`;

  return (
    <NavLink data-test-id={testId} to={`/${link}`} onClick={onClick || handleClick}>
      <h5 className={classNames(styles.root, { [styles.active]: defineActiveLink() })}>
        {text} {Icon}
      </h5>
    </NavLink>
  );
};
