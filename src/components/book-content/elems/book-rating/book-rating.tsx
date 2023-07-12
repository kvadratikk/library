import { useSelector } from 'react-redux';

import { bookSelector } from '../../../../store/selectors/book-selector';
import { Stars } from '../../../stars/stars';
import { BookTitle } from '../book-title/book-title';

import styles from './book-rating.module.scss';

export const BookRating = () => {
  const { rating } = useSelector(bookSelector).book;

  return (
    <div className={styles.root}>
      <BookTitle className={styles.title}>Рейтинг</BookTitle>

      <div className={styles.starsWrapper}>
        {rating && (
          <div className={styles.stars}>
            <Stars rating={rating} className={styles.star} />
          </div>
        )}

        <span className={styles.average}>{rating || <span>еще нет оценок</span>}</span>
      </div>
    </div>
  );
};
