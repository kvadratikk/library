import { ModalErrors, ModalSuccess } from 'constants/modal-texts';
import { Statuses } from 'constants/statuses';

import { ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Photo } from 'shared/assets/icons/photo.svg';
import avatarDefault from 'shared/assets/images/avatar.png';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { changeUserAvatar, createUserAvatar, getUser } from 'store/actions/user-actions';
import { userSelector } from 'store/selectors/user-selector';
import { setIsError, setIsLoading, setIsSuccess } from 'store/slices/loading-slice';

import styles from './profile-avatar.module.scss';

export const ProfileAvatar = () => {
  const dispatch = useAppDispatch();

  const { user, avatarId, loadingAvatar, loading, uploadAvatar } = useSelector(userSelector);
  const { firstName, lastName, avatar } = user;

  useEffect(() => {
    if (loading === Statuses.SUCCEDED && !user.id) dispatch(setIsLoading(true));
    if (loading === Statuses.SUCCEDED) dispatch(setIsLoading(false));

    if (avatarId) dispatch(changeUserAvatar(avatarId));

    if (uploadAvatar === Statuses.FAILED || loadingAvatar === Statuses.FAILED) {
      dispatch(setIsError({ isError: true, text: ModalErrors.AVATAR }));
    }
    if (loadingAvatar === Statuses.SUCCEDED) {
      dispatch(getUser()).then(() => dispatch(setIsSuccess({ isSuccess: true, text: ModalSuccess.AVATAR })));
    }
  }, [avatarId, dispatch, loading, loadingAvatar, uploadAvatar, user.id]);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const formData = new FormData();

    formData.append('files', files?.[0] as Blob);

    dispatch(createUserAvatar(formData));
  };

  return (
    <form className={styles.root} data-test-id='profile-avatar'>
      <label>
        <input type='file' onChange={handleSubmit} />
        <img src={avatar ? `${avatar}` : avatarDefault} alt='avatar' />
        <div className={styles.photo}>
          <Photo />
        </div>
      </label>

      <div className={styles.names}>
        <p>{lastName}</p>
        <p>{firstName}</p>
      </div>
    </form>
  );
};
