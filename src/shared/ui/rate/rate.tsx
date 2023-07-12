import { ModalErrors, ModalSuccess } from 'constants/modal-texts';
import { Statuses } from 'constants/statuses';

import { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StarsBtns } from 'components/stars/stars-btns';
import { ReactComponent as Close } from 'shared/assets/icons/close.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { getBook } from 'store/actions/book-actions';
import { changeComment, createComment } from 'store/actions/comments-actions';
import { getUser } from 'store/actions/user-actions';
import { bookSelector } from 'store/selectors/book-selector';
import { commentsSelector } from 'store/selectors/comments-selector';
import { userSelector } from 'store/selectors/user-selector';
import { setIsError, setIsLoading, setIsSuccess } from 'store/slices/loading-slice';

import './rate.scss';

export const Rate = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();

  const { comments } = useSelector(userSelector).user;
  const { id } = useSelector(bookSelector).book;
  const { loading } = useSelector(commentsSelector);

  const userComment = comments?.find((comment) => comment.bookId === id);

  const [rating, setRating] = useState(userComment?.rating || 5);
  const [text, setText] = useState(userComment?.text || '');

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED) {
      dispatch(setIsLoading(false));

      if (userComment) {
        dispatch(setIsError({ isError: true, text: ModalErrors.CHANGES }));
      } else {
        dispatch(
          setIsError({
            isError: true,
            text: ModalErrors.RATE,
          })
        );
      }

      handleClose();
    }
    if (loading === Statuses.SUCCEDED) {
      dispatch(setIsLoading(false));
      dispatch(getBook(String(id)));
      dispatch(getUser());

      if (userComment) {
        dispatch(setIsSuccess({ isSuccess: true, text: ModalSuccess.EDIT_RATE }));
      } else {
        dispatch(
          setIsSuccess({
            isSuccess: true,
            text: ModalSuccess.RATE,
          })
        );
      }

      handleClose();
    }
  }, [id, dispatch, handleClose, userComment, loading]);

  const handleFormClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      rating,
      text,
      book: String(id),
      user: String(id),
    };

    if (userComment) dispatch(changeComment(data));
    else dispatch(createComment(data));
  };

  return (
    <form
      data-test-id='modal-rate-book'
      className='rate'
      onClick={handleFormClick}
      aria-hidden='true'
      onSubmit={handleSubmit}
    >
      <button data-test-id='modal-close-button' className='cross' type='button' onClick={handleClose}>
        <Close />
      </button>
      <h4 data-test-id='modal-title'>{userComment ? 'Хотите изменить оценку?' : 'Оцените книгу'}</h4>
      <div className='rate__rating'>
        <span>Ваша оценка</span>
        <div className='rate__stars' data-test-id='rating'>
          <StarsBtns rating={rating} setRating={setRating} />
        </div>
      </div>
      <textarea
        data-test-id='comment'
        value={text}
        placeholder='Оставить отзыв'
        onChange={(e) => setText(e.target.value)}
      />
      <button data-test-id='button-comment' className='btn rate__submit' type='submit'>
        Оценить
      </button>
    </form>
  );
};
