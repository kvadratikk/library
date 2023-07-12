import { SortName, SortType } from 'constants/sort';
import { Statuses } from 'constants/statuses';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as Cross } from 'shared/assets/icons/close.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { usePagination } from 'shared/hooks/use-pagination';
import { BookingButton } from 'shared/ui/booking-button/booking-button';
import { Card } from 'shared/ui/card/card';
import { getSearchedBooks } from 'store/actions/books-actions';
import { booksSelector } from 'store/selectors/books-selector';
import { displaySelector } from 'store/selectors/display-selector';
import { deleteSort } from 'store/slices/display-slice';
import { SortText } from 'types/sort';

import { ContentDisplay } from './elems/content-display/content-display';
import { Filter } from './elems/filter/filter';
import { Search } from './elems/search/search';

import styles from './library-content.module.scss';

export const LibraryContent = () => {
  const dispatch = useAppDispatch();

  const { category } = useParams();
  const { display, sort } = useSelector(displaySelector);
  const { categoryBooks, loadingCategoryBooks } = useSelector(booksSelector);

  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isDataRequested, setIsDataRequested] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const observerTarget = useRef(null);

  usePagination({ observerTarget, search });

  useEffect(() => {
    setIsDataRequested(true);

    const getData = setTimeout(() => {
      if (isSearched) dispatch(getSearchedBooks({ category: String(category), search }));
      setIsDataRequested(false);
    }, 500);

    return () => clearTimeout(getData);
  }, [category, dispatch, isSearched, search]);

  const isPending = loadingCategoryBooks === Statuses.PENDING;
  const areEmptyBooks = !categoryBooks.length;
  const isEmptyResult = areEmptyBooks && !isPending;

  const handleSortTagClick = (sortName: SortName) => {
    dispatch(deleteSort(sortName));
    dispatch(getSearchedBooks({ category: String(category), search }));
  };

  return (
    <div className={styles.root}>
      <div className={classNames(styles.settings, { [styles.settingsOpen]: isSettingOpen })}>
        <Search
          setSearch={setSearch}
          setIsSearched={setIsSearched}
          setIsSettingOpen={setIsSettingOpen}
          className={classNames({ [styles.none]: isSettingOpen })}
        />
        <Filter
          search={search}
          setIsSettingOpen={setIsSettingOpen}
          className={classNames({ [styles.none]: isSettingOpen })}
        />
        <ContentDisplay search={search} />
      </div>

      <div className={styles.sortTags} data-test-id='sort-tags'>
        {(Object.entries(sort) as Array<[SortName, SortType]>).map(([sortName, sortType]) => (
          <button type='button' className={styles.sortTag} key={sortName} onClick={() => handleSortTagClick(sortName)}>
            {SortText[sortName]}
            {sortType === SortType.ASCENDING ? ' от А до Я' : ' от Я до А'}
            <Cross />
          </button>
        ))}
      </div>

      {(isDataRequested || isPending) && areEmptyBooks ? (
        <h3 className={styles.notDetected}>Загрузка...</h3>
      ) : isEmptyResult && !search ? (
        <h3 className={styles.notDetected} data-test-id='empty-category'>
          В этой категории книг ещё нет
        </h3>
      ) : isEmptyResult && search ? (
        <h3 className={styles.notDetected} data-test-id='search-result-not-found'>
          По запросу ничего не найдено
        </h3>
      ) : (
        <ul
          data-test-id='content'
          className={classNames(styles.cards, styles[display], { [styles.loading]: isPending })}
        >
          {categoryBooks.map((book) => (
            <li key={book.id}>
              <Card
                book={book}
                display={display}
                search={search}
                button={<BookingButton className={classNames(styles.booking)} book={book} />}
              />
            </li>
          ))}
        </ul>
      )}

      <div data-test-id='observer-target' ref={observerTarget} />
    </div>
  );
};
