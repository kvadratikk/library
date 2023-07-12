import classNames from 'classnames';

import { Button } from '../button/button';

import styles from './authorization-step.module.scss';

type AuthorizationStepProps = {
  Top: JSX.Element;
  Fields: JSX.Element;
  Bottom?: JSX.Element;
  Redirect: JSX.Element | string;
  submitText: string;
  isDisabled?: boolean;
  isHidden?: boolean;
};

export const AuthorizationStep = ({
  Top,
  Fields,
  Bottom,
  Redirect,
  submitText,
  isDisabled = false,
  isHidden,
}: AuthorizationStepProps) => (
  <div className={classNames(styles.root, { [styles.hidden]: isHidden })}>
    <div className={styles.top}>{Top}</div>
    <div className={styles.fields}>{Fields}</div>
    {Bottom}
    <Button disabled={isDisabled} type='submit' className={styles.submit}>
      {submitText}
    </Button>
    <div className={styles.transition}>{Redirect}</div>
  </div>
);
