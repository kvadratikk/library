import { ButtonThemes } from 'constants/button-themes';

import { Fragment, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Down } from 'shared/assets/icons/down.svg';
import { ReactComponent as Up } from 'shared/assets/icons/up.svg';
import { Button } from 'shared/ui/button/button';
import { Rate } from 'shared/ui/rate/rate';
import { bookSelector } from 'store/selectors/book-selector';
import { userSelector } from 'store/selectors/user-selector';

import { BookReview } from '../book-review/book-review';
import { BookTitle } from '../book-title/book-title';

import styles from './book-reviews.module.scss';

export const BookReviews = () => {
  const { comments } = useSelector(bookSelector).book;
  const { user } = useSelector(userSelector);

  const [isRate, setIsRate] = useState(false);
  const [isExpandedReviws, setIsExpandedReviews] = useState(true);

  const isCommented = comments?.some((comment) => comment.user.commentUserId === user.id);

  const sortedComments = [...(comments || [])].sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return Number(bDate) - Number(aDate);
  });

  const handleBodyClick = (e?: SyntheticEvent) => {
    if (e) e.stopPropagation();
    setIsRate(false);
  };

  const handleBtnClick = () => {
    setIsRate(true);
  };

  return (
    <Fragment>
      {isRate && (
        <div data-test-id='modal-outer' className='base dark' aria-hidden='true' onClick={handleBodyClick}>
          <Rate handleClose={handleBodyClick} />
        </div>
      )}

      <div className={styles.root} data-test-id='reviews'>
        <BookTitle className={styles.title}>
          <Fragment>
            Отзывы <span>{comments?.length}</span>
            <button
              data-test-id='button-hide-reviews'
              type='button'
              className={styles.control}
              onClick={() => {
                setIsExpandedReviews(!isExpandedReviws);
              }}
            >
              {isExpandedReviws ? <Up /> : <Down />}
            </button>
          </Fragment>
        </BookTitle>

        {comments && isExpandedReviws && (
          <ul>
            {sortedComments.map((comment) => (
              <BookReview comment={comment} key={comment.id} />
            ))}
          </ul>
        )}

        <Button
          data-test-id='button-rate-book'
          type='button'
          className={styles.rate}
          onClick={handleBtnClick}
          theme={isCommented ? ButtonThemes.BOOKED : ButtonThemes.DEFAULT}
        >
          {isCommented ? 'изменить оценку' : 'оценить книгу'}
        </Button>
      </div>
    </Fragment>
  );
};
