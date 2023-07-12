import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import defaultCover from 'shared/assets/images/default-cover.png';
import { bookSelector } from 'store/selectors/book-selector';
import { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import './swiper.scss';
import styles from './book-images.module.scss';

export const BookImages = () => {
  const { images } = useSelector(bookSelector).book;

  const [activeThumb, setActiveThumb] = useState<SwiperClass>();

  if (images && images[1])
    return (
      <div className={styles.root}>
        <Swiper
          data-test-id='slide-big'
          className={styles.slider}
          modules={[Navigation, Thumbs, Pagination]}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
          slidesPerView={1}
        >
          {images.map((img) => (
            <SwiperSlide key={img.url}>
              <img src={img.url} alt='book cover' className={styles.cover} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          className={styles.thumbs}
          onSwiper={setActiveThumb}
          modules={[Thumbs]}
          spaceBetween={30}
          slidesPerView='auto'
          centerInsufficientSlides={true}
        >
          {images.map((img) => (
            <SwiperSlide data-test-id='slide-mini' key={img.url} className={classNames(styles.thumb, 'thumb')}>
              <img src={img.url} alt='book cover' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );

  return <img src={images?.[0].url || defaultCover} alt='book cover' className={styles.cover} />;
};
