import { ButtonThemes } from 'constants/button-themes';
import { Display } from 'constants/display';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ReactComponent as Check } from 'shared/assets/icons/check.svg';
import { ReactComponent as List } from 'shared/assets/icons/menu.svg';
import { ReactComponent as Tile } from 'shared/assets/icons/square.svg';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Button } from 'shared/ui/button/button';
import { getSearchedBooks } from 'store/actions/books-actions';
import { displaySelector } from 'store/selectors/display-selector';
import { setDisplay, setIsBookingHidden } from 'store/slices/display-slice';

import styles from './content-display.module.scss';

type ContentDisplayProps = {
  search?: string;
};

export const ContentDisplay = ({ search }: ContentDisplayProps) => {
  const dispatch = useAppDispatch();

  const { category } = useParams();
  const { display } = useSelector(displaySelector);

  const handleHideBookingClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setIsBookingHidden(e.target.checked));
    dispatch(getSearchedBooks({ category: String(category), search }));
  };

  return (
    <div className={styles.root} data-test-id='hide-booking-books'>
      <label className={styles.booking}>
        <input type='checkbox' onChange={handleHideBookingClick} />
        <Check />

        <span className={styles.checkmark} />

        <span className={styles.text}>Скрыть бронь</span>
      </label>

      <Button
        data-test-id={`button-menu-view-${display === Display.TILE ? 'tile' : 'list'}`}
        theme={ButtonThemes.ICON}
        className={classNames(styles.icon)}
        onClick={() => {
          dispatch(setDisplay(display === Display.TILE ? Display.LIST : Display.TILE));
        }}
      >
        {display === Display.TILE ? <Tile /> : <List />}
      </Button>
    </div>
  );
};
