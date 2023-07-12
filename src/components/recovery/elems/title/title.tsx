import classNames from 'classnames';

import styles from './title.module.scss';

type TitleProps = {
  needMargin?: boolean;
};

export const Title = ({ needMargin }: TitleProps) => (
  <h4 className={classNames({ [styles.root]: needMargin })}>Восстановление пароля</h4>
);
