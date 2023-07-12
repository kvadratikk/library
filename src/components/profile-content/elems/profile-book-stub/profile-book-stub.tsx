import classNames from 'classnames';

import { ProfileStubThemes } from '../../constants/profile-stub-themes';

import styles from './profile-book-stub.module.scss';

type ProfileBookStubProps = {
  title: string;
  subtitle?: string;
  theme: ProfileStubThemes;
};

export const ProfileBookStub = ({ title, subtitle, theme }: ProfileBookStubProps) => (
  <div
    className={classNames(styles.root, styles[theme])}
    data-test-id={theme === ProfileStubThemes.EXPIRED ? 'expired' : 'empty-blue-card'}
  >
    <h3>{title}</h3>
    <div>{subtitle}</div>
  </div>
);
