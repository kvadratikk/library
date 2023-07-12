import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { loadingSelector } from '../store/selectors/loading-selector';

import { Loader } from './elems/loader/loader';
import { AppRouter } from './providers/router';

import './styles/index.scss';

import 'swiper/css';
import 'swiper/css/navigation';

export const App = () => {
  const { isLoading } = useSelector(loadingSelector);

  return (
    <Fragment>
      {isLoading && <Loader />}
      <AppRouter />
    </Fragment>
  );
};
