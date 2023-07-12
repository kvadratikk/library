import { ALL_BOOKS_CATEGORY } from 'constants/app-routes';
import { Statuses } from 'constants/statuses';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { BookContent } from 'components/book-content/book-content';
import { ReactComponent as Slash } from 'shared/assets/icons/slash.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { getBook } from 'store/actions/book-actions';
import { getCategoryBooks } from 'store/actions/books-actions';
import { bookSelector } from 'store/selectors/book-selector';
import { booksSelector } from 'store/selectors/books-selector';
import { setIsError, setIsLoading } from 'store/slices/loading-slice';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const dispatch = useAppDispatch();

  const { category, id: bookId } = useParams();
  const { loading } = useSelector(bookSelector);
  const { id, title } = useSelector(bookSelector).book;
  const { genres } = useSelector(booksSelector);

  const currentGenre = genres.find((genre) => genre.path === category)?.name;

  useEffect(() => {
    if (loading === Statuses.IDLE) {
      dispatch(getBook(String(bookId)));
    }
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED) {
      dispatch(setIsError({ isError: true }));
      dispatch(setIsLoading(false));
    }
    if (loading === Statuses.SUCCEDED) {
      dispatch(setIsLoading(false));
      dispatch(setIsError({ isError: false }));

      if (id && String(id) !== String(bookId)) dispatch(getBook(String(bookId)));
    }
  }, [dispatch, bookId, loading, genres, id]);

  const handleCategoryClick = () => {
    dispatch(getCategoryBooks(String(category)));
  };

  return (
    <section className={styles.root}>
      <div className={styles.nav}>
        <div className={classNames('container', styles.container)}>
          <NavLink to={`/books/${category}`} data-test-id='breadcrumbs-link' onClick={handleCategoryClick}>
            {category === ALL_BOOKS_CATEGORY ? 'Все книги' : currentGenre}
          </NavLink>
          <Slash />
          <span data-test-id='book-name'>{title}</span>
        </div>
      </div>

      {loading === Statuses.SUCCEDED && <BookContent />}
    </section>
  );
};
