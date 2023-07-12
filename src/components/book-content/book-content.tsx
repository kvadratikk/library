import { BookDetails } from './elems/book-details/book-details';
import { BookInformation } from './elems/book-information/book-information';
import { BookRating } from './elems/book-rating/book-rating';
import { BookReviews } from './elems/book-reviews/book-reviews';

export const BookContent = () => (
  <div className='container'>
    <BookInformation />
    <BookRating />
    <BookDetails />
    <BookReviews />
  </div>
);
