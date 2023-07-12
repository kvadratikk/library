import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BookingButton } from 'shared/ui/booking-button/booking-button';
import { bookSelector } from 'store/selectors/book-selector';

import { BookTitle } from '../book-title/book-title';

import styles from './book-about.module.scss';

export const BookAbout = () => {
  const { book } = useSelector(bookSelector);
  const { authors, issueYear, title, description } = book;

  return (
    <Fragment>
      <div className={styles.root}>
        <h3 className={styles.title} data-test-id='book-title'>
          {title}
        </h3>
        <h5 className={styles.info}>{`${authors}, ${issueYear}`}</h5>

        <BookingButton className={styles.booking} book={book} />
      </div>

      <div className={styles.descr}>
        <BookTitle>О книге</BookTitle>

        {description &&
          description
            .split('\\r')
            .join('')
            .split('\\n')
            .map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </Fragment>
  );
};
