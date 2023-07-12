import { ButtonThemes } from 'constants/button-themes';
import { SortName, SortType } from 'constants/sort';

import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as Close } from 'shared/assets/icons/close.svg';
import { ReactComponent as Down } from 'shared/assets/icons/down.svg';
import { ReactComponent as SortAsc } from 'shared/assets/icons/sort-asc.svg';
import { ReactComponent as SortDesc } from 'shared/assets/icons/sort-desc.svg';
import { ReactComponent as Up } from 'shared/assets/icons/up.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Button } from 'shared/ui/button/button';
import { getSearchedBooks } from 'store/actions/books-actions';
import { setSort } from 'store/slices/display-slice';
import { SortText } from 'types/sort';

import styles from './filter.module.scss';

const SortElements = [
  { sortName: SortName.TITLE, sortType: SortType.DESCENDING },
  { sortName: SortName.TITLE, sortType: SortType.ASCENDING },
  { sortName: SortName.AUTHORS, sortType: SortType.DESCENDING },
  { sortName: SortName.AUTHORS, sortType: SortType.ASCENDING },
];

type FilterProps = {
  search: string;
  className?: string;
  setIsSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Filter = ({ search, setIsSettingOpen, className }: FilterProps) => {
  const dispatch = useAppDispatch();

  const { category } = useParams();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleSortClick = (value: boolean) => {
    setIsSortOpen(value);
  };

  const handleSortBtnClick = (value: boolean) => {
    setShowFilter(value);
    setIsSettingOpen(value);
  };

  const changeSort = ({ sortName, sortType }: { sortName: SortName; sortType: SortType }) => {
    dispatch(setSort([sortName, sortType]));
    dispatch(getSearchedBooks({ category: String(category), search }));

    if (!showFilter) setIsSortOpen(false);
  };

  return (
    <Fragment>
      <div
        className={classNames('field', styles.root, { [styles.open]: isSortOpen, [styles.visible]: showFilter })}
        data-test-id='sort-button'
      >
        <button
          type='button'
          className={classNames(styles.sort, { [styles.close]: showFilter })}
          onClick={() => (showFilter ? handleSortBtnClick(false) : handleSortClick(!isSortOpen))}
        >
          <span>Сортировка</span>
          {showFilter ? <Close /> : isSortOpen ? <Up className={styles.arrow} /> : <Down className={styles.arrow} />}
        </button>

        {SortElements.map(({ sortName, sortType }) => (
          <button
            key={`${sortName}${sortType}`}
            type='button'
            onClick={() => changeSort({ sortName, sortType })}
            className={classNames(styles.option)}
            data-test-id='sort-option'
          >
            <span> {SortText[sortName]}</span>
            {sortType === SortType.DESCENDING ? <SortDesc /> : <SortAsc />}
          </button>
        ))}
      </div>

      <Button
        theme={ButtonThemes.ICON}
        className={classNames(styles.sortIcon, className)}
        onClick={() => {
          handleSortBtnClick(true);
          handleSortClick(true);
        }}
      >
        <SortDesc />
      </Button>
    </Fragment>
  );
};
