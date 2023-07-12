import { ButtonThemes } from 'constants/button-themes';

import { Fragment, SyntheticEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Booking } from 'components/booking/booking';
import { userSelector } from 'store/selectors/user-selector';
import { BookPreview } from 'types/book-preview';

import { Button } from '../button/button';

type BookingButtonProps = {
  className?: string;
  book: BookPreview;
};

export const BookingButton = ({ className, book }: BookingButtonProps) => {
  const { user } = useSelector(userSelector);
  const { booking, delivery } = book;

  const [isClick, setIsClick] = useState(false);

  const formatDate = new Date(String(delivery?.dateHandedTo));
  const day = String(formatDate.getDate()).padStart(2, '0');
  const month = String(formatDate.getMonth() + 1).padStart(2, '0');

  const isUserBooked = booking?.customerId === user.id;

  const text = booking ? 'забронирована' : delivery?.dateHandedTo ? `занята до ${day}.${month}` : 'забронировать';
  const disabled = (booking && !isUserBooked) || !!delivery?.dateHandedTo;

  const handleBodyClick = useCallback((e?: SyntheticEvent) => {
    if (e) e.stopPropagation();
    setIsClick(false);
  }, []);

  const handleBtnClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsClick(true);
  };

  return (
    <Fragment>
      {isClick && (
        <div data-test-id='modal-outer' className='base dark' onClick={handleBodyClick} aria-hidden='true'>
          <Booking handleClose={handleBodyClick} book={book} />
        </div>
      )}

      <Button
        data-test-id='booking-button'
        disabled={disabled}
        className={className}
        onClick={handleBtnClick}
        theme={isUserBooked ? ButtonThemes.BOOKED : ButtonThemes.DEFAULT}
      >
        {text}
      </Button>
    </Fragment>
  );
};
