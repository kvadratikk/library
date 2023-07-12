import { ButtonThemes } from 'constants/button-themes';
import { Display } from 'constants/display';

import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileStubThemes } from 'components/profile-content/constants/profile-stub-themes';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Button } from 'shared/ui/button/button';
import { Card } from 'shared/ui/card/card';
import { Rate } from 'shared/ui/rate/rate';
import { getBook } from 'store/actions/book-actions';
import { userSelector } from 'store/selectors/user-selector';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProfileBookStub } from '../profile-book-stub/profile-book-stub';
import { ProfileSubtitle } from '../profile-subtitle/profile-subtitle';
import { ProfileTitle } from '../profile-title/profile-title';

import './swiper.scss';
import styles from './profile-books-history.module.scss';

export const ProfileBooksHistory = () => {
  const dispatch = useAppDispatch();

  const { history, comments } = useSelector(userSelector).user;
  const { books } = history;

  const [isRate, setIsRate] = useState(false);

  const handleBodyClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsRate(false);
    },
    [setIsRate]
  );

  const handleBtnClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(getBook(String(id))).then(() => setIsRate(true));
  };

  return (
    <div data-test-id='history'>
      {isRate && (
        <div data-test-id='modal-outer' className='base dark' aria-hidden='true' onClick={handleBodyClick}>
          <Rate handleClose={handleBodyClick} />
        </div>
      )}
      <ProfileTitle>История</ProfileTitle>
      <ProfileSubtitle>Список прочитанных книг</ProfileSubtitle>

      {!books && <ProfileBookStub title='Вы не читали книг из нашей библиотеки ' theme={ProfileStubThemes.EMPTY} />}

      {books && (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView='auto'
          spaceBetween={30}
          navigation={true}
          pagination={{
            clickable: true,
          }}
        >
          {books.map((book) => {
            const { id } = book;
            const isCommented = comments.some((comment) => comment.bookId === id);

            return (
              <SwiperSlide key={id} data-test-id='history-slide'>
                <Card
                  className={styles.card}
                  book={book}
                  display={Display.TILE}
                  button={
                    <Button
                      className={styles.rate}
                      type='button'
                      data-test-id='history-review-button'
                      theme={isCommented ? ButtonThemes.BOOKED : ButtonThemes.DEFAULT}
                      onClick={(e) => handleBtnClick(e, id)}
                    >
                      {isCommented ? 'изменить оценку' : 'оставить отзыв'}
                    </Button>
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};
