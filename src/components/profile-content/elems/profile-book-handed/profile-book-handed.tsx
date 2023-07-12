import { Display } from 'constants/display';

import { useSelector } from 'react-redux';
import { ProfileStubThemes } from 'components/profile-content/constants/profile-stub-themes';
import { Card } from 'shared/ui/card/card';
import { userSelector } from 'store/selectors/user-selector';

import { ProfileBookStub } from '../profile-book-stub/profile-book-stub';
import { ProfileSubtitle } from '../profile-subtitle/profile-subtitle';
import { ProfileTitle } from '../profile-title/profile-title';

import styles from './profile-book-handed.module.scss';

export const ProfileBookHanded = () => {
  const { delivery } = useSelector(userSelector).user;
  const { id, book, dateHandedTo } = delivery;

  const day = String(new Date(dateHandedTo).getDate()).padStart(2, '0');
  const month = String(new Date(dateHandedTo).getMonth() + 1).padStart(2, '0');

  const isExpired = new Date(new Date().toDateString()) > new Date(new Date(dateHandedTo).toDateString());

  return (
    <div>
      <ProfileTitle>Книга которую взяли</ProfileTitle>
      <ProfileSubtitle>Здесь можете просмотреть информацию о книге и узнать сроки возврата</ProfileSubtitle>

      {!id && <ProfileBookStub title='Прочитав книгу, она отобразится в истории' theme={ProfileStubThemes.EMPTY} />}

      {id && (
        <div className={styles.wrapper}>
          {isExpired && (
            <ProfileBookStub
              title='Вышел срок пользования книги'
              subtitle='Верните книгу, пожалуйста'
              theme={ProfileStubThemes.EXPIRED}
            />
          )}

          <Card
            book={book}
            display={Display.LIST}
            button={
              <button className={styles.refund} type='button'>
                возврат {day}.{month}
              </button>
            }
          />
        </div>
      )}
    </div>
  );
};
