import classNames from 'classnames';

import { Stars } from '../../../../../components/stars/stars';
import { Display } from '../../../../../constants/display';

import styles from './card-rating.module.scss';

type CardRatingProps = {
  display: Display;
  rating: number;
};

export const CardRating = ({ display, rating }: CardRatingProps) => (
  <div className={classNames(styles.root, styles[display])}>
    {rating ? <Stars rating={rating} className={styles.star} /> : <span className={styles.text}>еще нет оценок</span>}
  </div>
);
