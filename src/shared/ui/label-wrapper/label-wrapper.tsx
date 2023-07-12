import styles from './label-wrapper.module.scss';

type LabelWrapperProps = {
  children: JSX.Element;
};

export const LabelWrapper = ({ children }: LabelWrapperProps) => <label className={styles.root}>{children}</label>;
