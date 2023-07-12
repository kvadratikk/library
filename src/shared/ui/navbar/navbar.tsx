import { AppRoutes } from 'constants/app-routes';

import { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { menuSelector } from 'store/selectors/menu-selector';
import { logout } from 'store/slices/authorization-slice';
import { setIsExpandedMenu } from 'store/slices/menu-slice';

import { BooksNavigation } from './elems/books-navigation/books-navigation';
import { NavbarLink } from './elems/navbar-link/navbar-link';

import styles from './navbar.module.scss';

type NavbarProps = {
  isBurgerMenu?: boolean;
};

export const Navbar = ({ isBurgerMenu }: NavbarProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const { isExpandedMenu } = useSelector(menuSelector);

  const handleBodyClick = () => {
    dispatch(setIsExpandedMenu(false));
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      {isBurgerMenu && isExpandedMenu && <div className='base' onClick={handleBodyClick} aria-hidden='true' />}

      <nav
        data-test-id={isBurgerMenu && 'burger-navigation'}
        className={classNames(styles.root, {
          [styles.visible]: isExpandedMenu && isBurgerMenu,
          [styles.burger]: isBurgerMenu,
          [styles.default]: !isBurgerMenu,
        })}
        ref={menuRef}
        aria-hidden='true'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ul className={styles.list}>
          <BooksNavigation isBurgerMenu={isBurgerMenu} />
          <li>
            <NavbarLink
              testId={isBurgerMenu ? 'burger-terms' : 'navigation-terms'}
              link={AppRoutes.TERMS}
              text='Правила пользования'
            />
          </li>
          <li>
            <NavbarLink
              testId={isBurgerMenu ? 'burger-contract' : 'navigation-contract'}
              link={AppRoutes.AGREEMENT}
              text='Договор оферты'
            />
          </li>

          {isExpandedMenu && (
            <div className={styles.profile}>
              <li>
                <NavbarLink link={AppRoutes.PROFILE} text='Профиль' />
              </li>

              <li data-test-id={isBurgerMenu && 'exit-button'}>
                <NavbarLink link={AppRoutes.AUTH} text='Выход' onClick={handleLogoutClick} />
              </li>
            </div>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};
