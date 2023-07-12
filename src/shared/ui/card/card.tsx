import { ALL_BOOKS_CATEGORY } from 'constants/app-routes';
import { Display } from 'constants/display';
import { Statuses } from 'constants/statuses';

import { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { getBook } from 'store/actions/book-actions';
import { bookSelector } from 'store/selectors/book-selector';
import { setIsLoading } from 'store/slices/loading-slice';
import { BookPreview } from 'types/book-preview';
import { BookUser } from 'types/user';

import { CardImage } from './elems/card-image/card-image';
import { CardInfo } from './elems/card-info/card-info';
import { CardRating } from './elems/card-rating/card-rating';
import { CardTitle } from './elems/card-title/card-title';

import styles from './card.module.scss';

type CardProps = {
  book: BookPreview | BookUser;
  display: Display;
  button: JSX.Element;
  search?: string;
  className?: string;
};

export const Card = ({ book, display, button, search, className }: CardProps) => {
  const category = useParams().category || ALL_BOOKS_CATEGORY;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading } = useSelector(bookSelector);

  const { id, image, rating, title, authors, issueYear } = book;

  const [isCardClick, setIsCardClick] = useState(false);

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.SUCCEDED || loading === Statuses.FAILED) dispatch(setIsLoading(false));
    if ((loading === Statuses.SUCCEDED || loading === Statuses.FAILED) && isCardClick) {
      navigate(`/books/${category}/${id}`);
      setIsCardClick(false);
    }
  }, [category, dispatch, id, isCardClick, loading, navigate, setIsCardClick]);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getBook(String(id)));
    setIsCardClick(true);
  };

  return (
    <NavLink to='' onClick={handleClick}>
      <div className={classNames(styles.root, styles[display], className)} data-test-id='card'>
        <CardImage display={display} url={image && typeof image === 'object' ? image.url : image} />

        <div className={classNames(styles.wrapper, { [styles.wrapperList]: display === Display.LIST })}>
          <CardRating display={display} rating={Number(rating)} />
          <CardTitle display={display} title={title} search={search} />
          <CardInfo search={search} display={display} issueYear={issueYear} authors={authors} />
          {button}
        </div>
      </div>
    </NavLink>
  );
};
