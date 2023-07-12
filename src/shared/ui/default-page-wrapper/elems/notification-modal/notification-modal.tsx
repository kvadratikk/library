import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { loadingSelector } from 'store/selectors/loading-selector';

import { resetBookingLoading } from '../../../../../store/slices/booking-slice';
import { resetCommentsLoading } from '../../../../../store/slices/comments-slice';
import { resetErrors } from '../../../../../store/slices/loading-slice';
import { ReactComponent as Caution } from '../../../../assets/icons/caution.svg';
import { ReactComponent as Check } from '../../../../assets/icons/check-in-circle.svg';
import { ReactComponent as Close } from '../../../../assets/icons/close.svg';

import styles from './notification-modal.module.scss';

export const NotificationModal = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, text } = useSelector(loadingSelector);

  const handleClose = () => {
    dispatch(resetErrors());
    dispatch(resetBookingLoading());
    dispatch(resetCommentsLoading());
  };

  useEffect(() => {
    const timerId = setTimeout(handleClose, 4000);

    return () => {
      clearTimeout(timerId);
    };
  });

  return (
    <div className={classNames('container', styles.container)}>
      <div
        className={classNames(styles.root, { [styles.error]: isError, [styles.success]: isSuccess })}
        data-test-id='error'
      >
        {isError && <Caution />}
        {isSuccess && <Check />}

        <span>{text || 'Что-то пошло не так. Обновите страницу через некоторое время.'}</span>
        <button type='button' onClick={handleClose} data-test-id='alert-close'>
          <Close />
        </button>
      </div>
    </div>
  );
};
