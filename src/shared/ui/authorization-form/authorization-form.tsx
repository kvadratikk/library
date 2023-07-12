import { FormEventHandler } from 'react';

import { FormContainer } from './form-container/form-container';

import styles from './authorization-form.module.scss';

type AuthorizationFormProps = {
  testId: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  needContainer?: boolean;
  children: JSX.Element;
  Header?: JSX.Element;
};

export const AuthorizationForm = ({ testId, onSubmit, needContainer, children, Header }: AuthorizationFormProps) => (
  <form className={styles.root} data-test-id={testId} onSubmit={onSubmit}>
    {Header}
    {needContainer ? <FormContainer>{children}</FormContainer> : children}
  </form>
);
