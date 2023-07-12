import classNames from 'classnames';

import styles from './tooltip-wrapper.module.scss';

type TooltipWrapperProps = {
  children?: JSX.Element | string;
  isHighlighted?: boolean;
};

export const TooltipWrapper = ({ children, isHighlighted }: TooltipWrapperProps) => (
  <div className={classNames(styles.root, { [styles.red]: isHighlighted })} data-test-id='hint'>
    {children}
  </div>
);
