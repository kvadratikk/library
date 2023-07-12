import { ButtonThemes } from 'constants/button-themes';

import { ChangeEvent, Fragment, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as Close } from 'shared/assets/icons/close.svg';
import { ReactComponent as SearchIcon } from 'shared/assets/icons/search.svg';
import { Button } from 'shared/ui/button/button';

import styles from './search.module.scss';

type SearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

export const Search = ({ setSearch, setIsSearched, setIsSettingOpen, className }: SearchProps) => {
  const [showInput, setShowInput] = useState(false);

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsSearched(true);
  };

  return (
    <Fragment>
      <div className={classNames(styles.wrapper, { [styles.visible]: showInput })}>
        <input
          data-test-id='input-search'
          className={classNames('field', styles.root)}
          type='search'
          placeholder='Поиск книги или автора…'
          onChange={changeSearch}
        />
        <SearchIcon />
        <button
          type='button'
          className={styles.close}
          onClick={() => {
            setShowInput(false);
            setIsSettingOpen(false);
          }}
        >
          {showInput && <Close />}
        </button>
      </div>

      <Button
        theme={ButtonThemes.ICON}
        className={classNames(styles.open, className)}
        onClick={() => {
          setShowInput(true);
          setIsSettingOpen(true);
        }}
      >
        <SearchIcon />
      </Button>
    </Fragment>
  );
};
