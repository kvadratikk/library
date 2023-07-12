import { Statuses } from 'constants/statuses';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { recoverySelector } from 'store/selectors/recovery-selector';
import { setIsLoading } from 'store/slices/loading-slice';

import { ForgotPassword } from './elems/forgot-password/forgot-password';
import { ResetPassword } from './elems/reset-password/reset-password';

export const Recovery = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useSelector(recoverySelector);

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED || loading === Statuses.SUCCEDED) dispatch(setIsLoading(false));
  }, [dispatch, loading]);

  return search ? <ResetPassword /> : <ForgotPassword />;
};
