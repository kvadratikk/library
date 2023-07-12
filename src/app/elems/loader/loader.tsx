import { ReactComponent as LoaderCircle } from 'shared/assets/icons/loader-circle.svg';

import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.root} data-test-id='loader'>
    <LoaderCircle />
  </div>
);
