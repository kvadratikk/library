import { Stars } from 'components/stars/stars';
import userAvatar from 'shared/assets/images/avatar.png';
import { Comment } from 'types/book-item';

import styles from './book-review.module.scss';

type BookReviewProps = {
  comment: Comment;
};

export const BookReview = ({ comment }: BookReviewProps) => {
  const { rating, text, createdAt, user } = comment;
  const { firstName, lastName, avatarUrl } = user;

  const date = new Date(createdAt).toLocaleString('ru', { day: 'numeric', year: 'numeric', month: 'long' });

  return (
    <li data-test-id='comment-wrapper'>
      <div className={styles.root}>
        <img src={avatarUrl ? avatarUrl : userAvatar} alt='user' />
        <span data-test-id='comment-author'>{`${firstName} ${lastName}`}</span>
        <span data-test-id='comment-date'>{date}</span>
      </div>
      <div data-test-id='rating' className={styles.stars}>
        <Stars rating={rating} />
      </div>
      <p data-test-id='comment-text'>{text}</p>
    </li>
  );
};
