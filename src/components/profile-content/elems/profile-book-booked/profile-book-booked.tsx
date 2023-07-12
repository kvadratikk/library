import { Display } from 'constants/display';
import { ModalErrors, ModalSuccess } from 'constants/modal-texts';
import { Statuses } from 'constants/statuses';

import { SyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ProfileStubThemes } from 'components/profile-content/constants/profile-stub-themes';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Button } from 'shared/ui/button/button';
import { Card } from 'shared/ui/card/card';
import { deleteBooking } from 'store/actions/booking-actions';
import { getUser } from 'store/actions/user-actions';
import { bookingSelector } from 'store/selectors/booking-selector';
import { userSelector } from 'store/selectors/user-selector';
import { setIsError, setIsSuccess } from 'store/slices/loading-slice';

import { ProfileBookStub } from '../profile-book-stub/profile-book-stub';
import { ProfileSubtitle } from '../profile-subtitle/profile-subtitle';
import { ProfileTitle } from '../profile-title/profile-title';

import styles from './profile-book-booked.module.scss';

export const ProfileBookBooked = () => {
  const dispatch = useAppDispatch();

  const { loading } = useSelector(bookingSelector);
  const { booking } = useSelector(userSelector).user;
  const { id, book, dateOrder } = booking;

  const isExpired = new Date(new Date().toDateString()) > new Date(new Date(dateOrder).toDateString());

  useEffect(() => {
    if (loading === Statuses.SUCCEDED) {
      dispatch(setIsSuccess({ isSuccess: true, text: ModalSuccess.BOOKING_DELETE }));
      dispatch(getUser());
    }
    if (loading === Statuses.FAILED) {
      dispatch(setIsError({ isError: true, text: ModalErrors.BOOKING_DELETE }));
    }
  }, [dispatch, loading]);

  const handleDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(deleteBooking(id));
  };

  return (
    <div>
      <ProfileTitle>Забронированная книга</ProfileTitle>
      <ProfileSubtitle>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</ProfileSubtitle>

      {!id && <ProfileBookStub title='Забронируйте книгу и она отобразится ' theme={ProfileStubThemes.EMPTY} />}

      {id && (
        <div className={styles.wrapper}>
          {isExpired && (
            <ProfileBookStub
              title='Дата бронирования книги истекла '
              subtitle='Через 24 часа книга будет  доступна всем'
              theme={ProfileStubThemes.EXPIRED}
            />
          )}

          <Card
            className={styles.card}
            book={book}
            display={Display.LIST}
            button={
              <Button
                className={styles.submit}
                type='button'
                onClick={handleDelete}
                data-test-id='cancel-booking-button'
              >
                отменить бронь
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};
