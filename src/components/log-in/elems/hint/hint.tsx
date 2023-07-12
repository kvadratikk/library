import styles from './hint.module.scss';

export const Hint = () => (
  <div className={styles.root} data-test-id='hint'>
    Неверный логин или пароль!
  </div>
);
