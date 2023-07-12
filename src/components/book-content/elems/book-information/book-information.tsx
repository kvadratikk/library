import { BookAbout } from '../book-about/book-about';
import { BookImages } from '../book-images/book-images';

import styles from './book-information.module.scss';

export const BookInformation = () => (
  <div className={styles.root}>
    <BookImages />
    <BookAbout />
  </div>
);
