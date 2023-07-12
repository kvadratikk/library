import { Statuses } from 'constants/statuses';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCategoryBooks } from 'store/actions/books-actions';
import { booksSelector } from 'store/selectors/books-selector';

import { useAppDispatch } from './use-app-dispatch';

type UsePaginationArgs = {
  observerTarget: React.MutableRefObject<null>;
  search?: string;
};

export const usePagination = ({ observerTarget, search }: UsePaginationArgs) => {
  const dispatch = useAppDispatch();

  const { category } = useParams();
  const { isAllPages, categoryBooks, loadingCategoryBooks } = useSelector(booksSelector);

  const [page, setPage] = useState(0);

  const isPending = loadingCategoryBooks === Statuses.PENDING;

  useEffect(() => {
    setPage(categoryBooks.length ? 1 : 0);
  }, [category, categoryBooks.length]);

  useEffect(() => {
    let observerRefValue: Element | null = null;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isAllPages && !isPending) {
        const nextPage = page + 1;

        dispatch(addCategoryBooks({ page: nextPage, category: String(category), search })).then(() =>
          setPage(nextPage)
        );
      }
    };

    const observer = new IntersectionObserver(observerCallback);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [category, dispatch, isAllPages, isPending, observerTarget, page, search]);

  return page;
};
