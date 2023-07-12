import styles from './profile-subtitle.module.scss';

type ProfileSubtitleProps = {
  children: JSX.Element | string;
};

export const ProfileSubtitle = ({ children }: ProfileSubtitleProps) => <div className={styles.root}>{children}</div>;
