import classNames from 'classnames';

import styles from './book-title.module.scss';

type BookTitleProps = {
  className?: string;
  children: JSX.Element | string;
};

export const BookTitle = ({ className, children }: BookTitleProps) => (
  <h5 className={classNames(styles.root, className)}>{children}</h5>
);
