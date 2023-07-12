import { Statuses } from 'constants/statuses';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ProfileContent } from 'components/profile-content/profile-content';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { userSelector } from 'store/selectors/user-selector';
import { setIsLoading } from 'store/slices/loading-slice';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const { user, loading } = useSelector(userSelector);

  useEffect(() => {
    if (loading === Statuses.PENDING && !user.id) dispatch(setIsLoading(true));
    if (loading === Statuses.SUCCEDED || loading === Statuses.FAILED) dispatch(setIsLoading(false));
  }, [dispatch, loading, user.id]);

  return (
    <section className={styles.root}>
      <div className={classNames('container', styles.container)}>{user.id && <ProfileContent />}</div>
    </section>
  );
};
