import { ReactComponent as Facebook } from 'shared/assets/icons/facebook.svg';
import { ReactComponent as Inst } from 'shared/assets/icons/inst.svg';
import { ReactComponent as Linkdin } from 'shared/assets/icons/linkdin.svg';
import { ReactComponent as Vk } from 'shared/assets/icons/vk.svg';

import styles from './footer.module.scss';

const Networks = [
  {
    link: 'https://www.facebook.com/',
    img: <Facebook />,
  },
  {
    link: 'https://www.instagram.com/',
    img: <Inst />,
  },
  { link: 'https://vk.com/', img: <Vk /> },
  {
    link: 'https://www.linkedin.com/',
    img: <Linkdin />,
  },
];

export const Footer = () => (
  <footer data-test-id='footer' className={styles.root}>
    <div className='container'>
      <div className={styles.wrapper}>
        <span className={styles.copyright}>© 2020-2023 Cleverland. Все права защищены.</span>
        <div className={styles.networks}>
          {Networks.map(({ link, img }) => (
            <a key={link} href={link} target='_blank' rel='noreferrer' className={styles.link}>
              {img}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
