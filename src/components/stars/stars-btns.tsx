import { Fragment } from 'react';
import { ReactComponent as Star } from 'shared/assets/icons/star.svg';
import { ReactComponent as StarYellow } from 'shared/assets/icons/star-yellow.svg';

export const StarsBtns = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}) => (
  <Fragment>
    {Array.from({ length: 5 }, (_, i) => i).map((point) => (
      <button
        type='button'
        data-test-id='star'
        key={point + rating}
        onClick={() => {
          setRating(point + 1);
        }}
      >
        {point < Math.floor(rating) ? <StarYellow data-test-id='star-active' /> : <Star />}
      </button>
    ))}
  </Fragment>
);
