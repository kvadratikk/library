import { Display } from 'constants/display';

import classNames from 'classnames';

import { modifyTitle } from '../../helpers/modify-title';

import styles from './card-info.module.scss';

type CardInfoProps = {
  display: Display;
  authors?: string[];
  issueYear?: string;
  search?: string;
};

export const CardInfo = ({ authors, issueYear, display, search }: CardInfoProps) => (
  <span className={classNames(styles.root, styles[display])}>
    {search && authors ? modifyTitle(authors[0], search) : authors?.[0]}, {issueYear}
  </span>
);
