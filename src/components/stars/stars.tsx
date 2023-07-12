import { Fragment } from 'react';
import { ReactComponent as Star } from 'shared/assets/icons/star.svg';
import { ReactComponent as StarYellow } from 'shared/assets/icons/star-yellow.svg';

type StarsProps = {
  rating: number;
  className?: string;
};

export const Stars = ({ rating, className }: StarsProps) => (
  <Fragment>
    {Array.from({ length: 5 }, (_, i) => i).map((point) => (
      <span data-test-id='star' key={point + rating}>
        {point < Math.floor(rating) ? (
          <StarYellow className={className} data-test-id='star-active' />
        ) : (
          <Star className={className} />
        )}
      </span>
    ))}
  </Fragment>
);
