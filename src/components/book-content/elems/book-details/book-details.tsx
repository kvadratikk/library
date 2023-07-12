import { useSelector } from 'react-redux';

import { bookSelector } from '../../../../store/selectors/book-selector';
import { BookTitle } from '../book-title/book-title';

import styles from './book-details.module.scss';

export const BookDetails = () => {
  const { book } = useSelector(bookSelector);
  const { publish, issueYear, pages, cover, format, weight, categories, ISBN, producer } = book;

  const list1 = [
    { title: 'Издательство', description: publish },
    { title: 'Год издания', description: issueYear },
    { title: 'Страниц', description: pages },
    { title: 'Переплёт', description: cover },
    { title: 'Формат', description: format },
  ];

  const list2 = [
    { title: 'Жанр', description: categories?.join(', ') },
    { title: 'Вес', description: weight },
    { title: 'ISBN', description: ISBN },
    { title: 'Изготовитель', description: producer },
  ];

  return (
    <div className={styles.root}>
      <BookTitle>Подробная информация</BookTitle>

      <div>
        <ul>
          {list1.map((el) => (
            <li key={el.title}>
              <span className={styles.title}>{el.title}</span>
              <span className={styles.description}>{el.description}</span>
            </li>
          ))}
        </ul>
        <ul>
          {list2.map((el) => (
            <li key={el.title}>
              <span className={styles.title}>{el.title}</span>
              <span className={styles.description}>{el.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
