import { ALL_BOOKS_CATEGORY } from 'constants/app-routes';
import { Statuses } from 'constants/statuses';

import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Footer } from 'components/footer/footer';
import { Header } from 'components/header/header';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { getCategoryBooks, getGenres } from 'store/actions/books-actions';
import { getUser } from 'store/actions/user-actions';
import { booksSelector } from 'store/selectors/books-selector';
import { loadingSelector } from 'store/selectors/loading-selector';
import { userSelector } from 'store/selectors/user-selector';

import { NotificationModal } from './elems/notification-modal/notification-modal';

import styles from './default-page-wrapper.module.scss';

type DefaultPageWrapperProps = {
  children: JSX.Element;
};

export const DefaultPageWrapper = ({ children }: DefaultPageWrapperProps) => {
  const dispatch = useAppDispatch();

  const { category } = useParams();
  const { loading: loadingUser } = useSelector(userSelector);
  const { loading: loadingBooks } = useSelector(booksSelector);
  const { isError, isSuccess } = useSelector(loadingSelector);

  useEffect(() => {
    if (loadingUser === Statuses.IDLE) dispatch(getUser());
    if (loadingBooks === Statuses.IDLE) {
      dispatch(getGenres());
      dispatch(getCategoryBooks(String(category || ALL_BOOKS_CATEGORY)));
    }
  }, [dispatch, loadingUser, loadingBooks, category]);

  return (
    <Fragment>
      <Header />
      <main className={styles.root}>
        {(isError || isSuccess) && <NotificationModal />}

        {children}
      </main>
      <Footer />
    </Fragment>
  );
};
