import { Statuses } from 'constants/statuses';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { LibraryContent } from 'components/library-content/library-content';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Navbar } from 'shared/ui/navbar/navbar';
import { booksSelector } from 'store/selectors/books-selector';
import { userSelector } from 'store/selectors/user-selector';
import { setIsError, setIsLoading } from 'store/slices/loading-slice';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const { loading: loadingBooks } = useSelector(booksSelector);
  const { loading: loadingUser } = useSelector(userSelector);

  useEffect(() => {
    if (loadingBooks === Statuses.PENDING || loadingUser === Statuses.PENDING) {
      dispatch(setIsLoading(true));
    }

    if (loadingBooks === Statuses.FAILED || loadingUser === Statuses.FAILED) {
      dispatch(setIsError({ isError: true }));
      dispatch(setIsLoading(false));
    }

    if (loadingBooks === Statuses.SUCCEDED && loadingUser === Statuses.SUCCEDED) {
      dispatch(setIsLoading(false));
      dispatch(setIsError({ isError: false }));
    }
  }, [dispatch, loadingBooks, loadingUser]);

  return (
    <section className={styles.root} data-test-id='main-page'>
      <div className={classNames('container', styles.container)}>
        <Navbar />

        {loadingBooks === Statuses.SUCCEDED && <LibraryContent />}
      </div>
    </section>
  );
};
