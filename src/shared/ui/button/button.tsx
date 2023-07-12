import { ButtonThemes } from 'constants/button-themes';

import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: ButtonThemes;
  className?: string;
};

export const Button = ({
  type = 'button',
  children,
  theme = ButtonThemes.DEFAULT,
  className,
  ...otherProps
}: ButtonProps) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} {...otherProps} className={classNames(styles.root, styles[theme], className)}>
    {children}
  </button>
);
