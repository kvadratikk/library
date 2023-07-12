import styles from './form-container.module.scss';

type FormContainerProps = {
  children: JSX.Element;
};

export const FormContainer = ({ children }: FormContainerProps) => <div className={styles.root}>{children}</div>;
