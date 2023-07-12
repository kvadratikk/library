import styles from './profile-title.module.scss';

type ProfileTitleProps = {
  children: JSX.Element | string;
};

export const ProfileTitle = ({ children }: ProfileTitleProps) => <h4 className={styles.root}>{children}</h4>;
