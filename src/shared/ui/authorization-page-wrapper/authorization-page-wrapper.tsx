import classNames from 'classnames';

import styles from './authorization-page-wrapper.module.scss';

type AuthorizationPageWrapperProps = {
  children: JSX.Element;
};

export const AuthorizationPageWrapper = ({ children }: AuthorizationPageWrapperProps) => (
  <main className={styles.main} data-test-id='auth'>
    <section className={styles.root}>
      <div className={classNames(styles.containerAuth, 'container')}>
        <h3 className={styles.title}>Cleverland</h3>
        {children}
      </div>
    </section>
  </main>
);
