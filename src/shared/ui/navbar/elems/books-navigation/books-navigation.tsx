import { ALL_BOOKS_CATEGORY, AppRoutes } from 'constants/app-routes';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as Down } from 'shared/assets/icons/down.svg';
import { ReactComponent as Up } from 'shared/assets/icons/up.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { getCategoryBooks } from 'store/actions/books-actions';
import { booksSelector } from 'store/selectors/books-selector';
import { menuSelector } from 'store/selectors/menu-selector';
import { setIsExpandedMenu, setShouldGenresHide } from 'store/slices/menu-slice';

import { NavbarLink } from '../navbar-link/navbar-link';

import styles from './books-navigation.module.scss';

type BooksNavigationProps = {
  isBurgerMenu?: boolean;
};

export const BooksNavigation = ({ isBurgerMenu }: BooksNavigationProps) => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const { genres } = useSelector(booksSelector);
  const { shouldGenresHide } = useSelector(menuSelector);

  const isBooksPath = pathname.includes('/books/');

  useEffect(() => {
    if (!isBooksPath && pathname !== '/') dispatch(setShouldGenresHide(true));
  }, [pathname, dispatch, isBooksPath]);

  const handleAllBooksClick = () => {
    if (isBooksPath) dispatch(setShouldGenresHide(!shouldGenresHide));
  };

  const handleGenreClick = (category: string) => {
    dispatch(setIsExpandedMenu(false));
    dispatch(getCategoryBooks(category));
  };

  return (
    <li className={styles.root}>
      <NavbarLink
        testId={isBurgerMenu ? 'burger-showcase' : 'navigation-showcase'}
        text='Витрина книг'
        link={AppRoutes.BOOKS}
        onClick={handleAllBooksClick}
        Icon={shouldGenresHide ? <Down /> : <Up />}
      />

      <ul className={classNames(styles.list, { [styles.expanded]: !shouldGenresHide })}>
        <li>
          <NavLink
            data-test-id={isBurgerMenu ? 'burger-books' : 'navigation-books'}
            to={`/${AppRoutes.BOOKS}`}
            onClick={() => handleGenreClick(ALL_BOOKS_CATEGORY)}
            className={styles.link}
          >
            <span className={classNames(styles.genre, { [styles.active]: pathname === `/${AppRoutes.BOOKS}` })}>
              Все книги
            </span>
          </NavLink>
        </li>

        {genres.map(({ id, path, name, booksCount }) => (
          <li key={id}>
            <NavLink to={`/books/${path}`} onClick={() => handleGenreClick(path)} className={styles.link}>
              <span
                data-test-id={isBurgerMenu ? `burger-${path}` : `navigation-${path}`}
                className={classNames(styles.genre, { [styles.active]: pathname === `/books/${path}` })}
              >
                {name}
              </span>
              <span
                className={styles.quantity}
                data-test-id={isBurgerMenu ? `burger-book-count-for-${path}` : `navigation-book-count-for-${path}`}
              >
                {booksCount}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};
