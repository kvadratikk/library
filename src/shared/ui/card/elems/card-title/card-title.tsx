import { Display } from 'constants/display';

import classNames from 'classnames';

import { modifyTitle } from '../../helpers/modify-title';

import styles from './card-title.module.scss';

type CardTitleProps = {
  display: Display;
  title: string;
  search?: string;
};

export const CardTitle = ({ search, title, display }: CardTitleProps) => (
  <span className={classNames(styles.root, styles[display])}>{search ? modifyTitle(title, search) : title}</span>
);
