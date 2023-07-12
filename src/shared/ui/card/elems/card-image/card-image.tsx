import classNames from 'classnames';

import { Display } from '../../../../../constants/display';
import defaultCover from '../../../../assets/images/default-cover.png';

import styles from './card-image.module.scss';

type CardImageProps = {
  display: Display;
  url?: string;
};

export const CardImage = ({ display, url }: CardImageProps) => (
  <img
    src={`${url || defaultCover}`}
    loading='lazy'
    alt='book cover'
    className={classNames(styles.root, styles[display])}
  />
);
