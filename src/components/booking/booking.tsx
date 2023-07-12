import { ModalErrors, ModalSuccess } from 'constants/modal-texts';
import { Statuses } from 'constants/statuses';

import { SyntheticEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactComponent as Close } from 'shared/assets/icons/close.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { getBook } from 'store/actions/book-actions';
import { changeBooking, createBooking, deleteBooking } from 'store/actions/booking-actions';
import { getCategoryBooks } from 'store/actions/books-actions';
import { getUser } from 'store/actions/user-actions';
import { bookingSelector } from 'store/selectors/booking-selector';
import { userSelector } from 'store/selectors/user-selector';
import { resetBookingLoading } from 'store/slices/booking-slice';
import { setIsError, setIsLoading, setIsSuccess } from 'store/slices/loading-slice';
import { BookPreview } from 'types/book-preview';

import { Calendar } from './calendar/calendar';

import './booking.scss';

export const Booking = ({ handleClose, book }: { handleClose: (e?: SyntheticEvent) => void; book: BookPreview }) => {
  const dispatch = useAppDispatch();

  const { category } = useParams();
  const { user } = useSelector(userSelector);
  const { loading } = useSelector(bookingSelector);
  const { handleSubmit, watch, setValue, getValues } = useForm<{ dateOrder: string }>();
  const { id, booking } = book;
  const { dateOrder } = booking || {};

  const [isDeleted, setIsDeleted] = useState(false);

  const isUserBooked = booking?.customerId === user.id;
  const prevDate = new Date(String(dateOrder)).toDateString();
  const newDate = new Date(getValues('dateOrder')).toDateString();
  const isDisabled = (isUserBooked && prevDate === newDate) || !watch('dateOrder');
  const title = isUserBooked ? 'Изменение даты бронирования' : 'Выбор даты бронирования';

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED) {
      dispatch(setIsLoading(false));
      dispatch(
        setIsError({
          isError: true,
          text: isDeleted ? ModalErrors.BOOKING_DELETE : isUserBooked ? ModalErrors.CHANGES : ModalErrors.BOOKING,
        })
      );

      handleClose();
      setIsDeleted(false);
    }
    if (loading === Statuses.SUCCEDED) {
      dispatch(getUser());
      dispatch(getCategoryBooks(String(category)));
      dispatch(getBook(String(id)));
      dispatch(setIsLoading(false));
      dispatch(
        setIsSuccess({
          isSuccess: true,
          text: isDeleted ? ModalSuccess.BOOKING_DELETE : isUserBooked ? ModalSuccess.CHANGES : ModalSuccess.BOOKING,
        })
      );

      handleClose();
      setIsDeleted(false);
    }

    return () => {
      dispatch(resetBookingLoading());
    };
  }, [category, dispatch, handleClose, id, isDeleted, isUserBooked, loading]);

  const handleFormClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const onSubmit: SubmitHandler<{ dateOrder: string }> = (data) => {
    const date = new Date(data.dateOrder);

    date.setMinutes(-date.getTimezoneOffset());

    const body = {
      dateOrder: date.toISOString(),
      order: true,
      customer: String(user.id),
      book: String(id),
    };

    if (isUserBooked) dispatch(changeBooking({ ...body, bookingId: booking.id }));
    else dispatch(createBooking(body));
  };

  const handleDelete = () => {
    if (booking?.id) dispatch(deleteBooking(booking.id));

    setIsDeleted(true);
  };

  const handleChange = (date: string) => {
    setValue('dateOrder', date);
  };

  return (
    <form
      data-test-id='booking-modal'
      className='booking'
      onClick={handleFormClick}
      aria-hidden='true'
      onSubmit={handleSubmit(onSubmit)}
    >
      <button data-test-id='modal-close-button' className='cross' type='button' onClick={handleClose}>
        <Close />
      </button>
      <h4 data-test-id='modal-title'>{title}</h4>

      <Calendar book={book} handleChange={handleChange} />

      <button data-test-id='booking-button' type='submit' disabled={isDisabled} className='btn booking__submit'>
        забронировать
      </button>
      {isUserBooked && (
        <button
          data-test-id='booking-cancel-button'
          type='button'
          onClick={handleDelete}
          className='btn booked booking__submit'
        >
          отменить бронь
        </button>
      )}
    </form>
  );
};
