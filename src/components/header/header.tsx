import { ALL_BOOKS_CATEGORY, AppRoutes } from 'constants/app-routes';

import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as Close } from 'shared/assets/icons/close.svg';
import { ReactComponent as Menu } from 'shared/assets/icons/menu.svg';
import avatarDefault from 'shared/assets/images/avatar.png';
import logo from 'shared/assets/images/logo-big.png';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Navbar } from 'shared/ui/navbar/navbar';
import { getCategoryBooks } from 'store/actions/books-actions';
import { menuSelector } from 'store/selectors/menu-selector';
import { userSelector } from 'store/selectors/user-selector';
import { logout } from 'store/slices/authorization-slice';
import { setIsExpandedMenu } from 'store/slices/menu-slice';

import { defineTitle } from './helpers/define-title';

import styles from './header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { isExpandedMenu } = useSelector(menuSelector);
  const { firstName, avatar } = useSelector(userSelector).user;

  const [isExpandedProfile, setIsExpandedProfile] = useState(false);

  const title = defineTitle(pathname);

  const handleBurgerClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setIsExpandedMenu(!isExpandedMenu));
  };

  const handleProfile = (value: boolean) => {
    setIsExpandedProfile(value);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleLogoClick = () => {
    dispatch(getCategoryBooks(ALL_BOOKS_CATEGORY));
  };

  return (
    <header className={classNames(styles.root, { [styles.expanded]: isExpandedProfile })}>
      <div className={classNames(styles.container, 'container')}>
        <NavLink to={`/${AppRoutes.BOOKS}`} className={styles.logo} onClick={handleLogoClick}>
          <img src={logo} alt='logo' />
        </NavLink>

        <button data-test-id='button-burger' type='button' className={styles.openNav} onClick={handleBurgerClick}>
          {isExpandedMenu ? <Close className={styles.cross} /> : <Menu className={styles.menu} />}
        </button>

        <h3 className={styles.title}>{title}</h3>

        <div
          className={styles.profile}
          onMouseEnter={() => handleProfile(true)}
          onMouseLeave={() => handleProfile(false)}
        >
          <button type='button' className={styles.profileButton}>
            <span>Привет, {firstName}!</span>
            <img src={avatar ? `${avatar}` : avatarDefault} alt='avatar' />
          </button>

          <ul className={classNames(styles.options, { [styles.optionVisible]: isExpandedProfile })}>
            <li>
              <NavLink to={`/${AppRoutes.PROFILE}`} data-test-id='profile-button'>
                <h5>Профиль</h5>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${AppRoutes.AUTH}`} onClick={handleLogoutClick}>
                <h5>Выход</h5>
              </NavLink>
            </li>
          </ul>
        </div>

        <Navbar isBurgerMenu={true} />
      </div>
    </header>
  );
};
