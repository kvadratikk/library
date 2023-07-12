import { Statuses } from 'constants/statuses';

import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { AuthorizationForm } from 'shared/ui/authorization-form/authorization-form';
import { createUser } from 'store/actions/registration-actions';
import { registrationSelector } from 'store/selectors/registration-selector';
import { setIsLoading } from 'store/slices/loading-slice';
import { RegInputs } from 'types/inputs';

import { LoginPassword } from './elems/login-password/login-password';
import { NameSurname } from './elems/name-surname/name-surname';
import { RegistrationModalExist } from './elems/registration-modal-exist/registration-modal-exist';
import { RegistrationModalFail } from './elems/registration-modal-fail/registration-modal-fail';
import { RegistrationModalSuccess } from './elems/registration-modal-success/registration-modal-success';
import { TelEmail } from './elems/tel-email/tel-email';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const { loading, code } = useSelector(registrationSelector);

  const [step, setStep] = useState(1);

  const form = useForm<RegInputs>({
    mode: 'all',
  });

  const { handleSubmit, reset, getValues } = form;

  const otherCode = code && code !== 200 && code !== 400;

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED || loading === Statuses.SUCCEDED) dispatch(setIsLoading(false));

    if (code) setStep(1);
    if (code === 400) reset();
  }, [code, dispatch, loading, reset]);

  const onSubmit = (data: RegInputs) => {
    if (Object.keys(data).length < 6 && !code) {
      setStep(step + 1);

      return;
    }

    dispatch(createUser(data));
  };

  return (
    <Fragment>
      {code === 200 && <RegistrationModalSuccess />}
      {code === 400 && <RegistrationModalExist />}
      {otherCode && <RegistrationModalFail onClick={() => onSubmit(getValues())} />}

      <AuthorizationForm testId='register-form' needContainer={true} onSubmit={handleSubmit(onSubmit)}>
        <Fragment>
          <LoginPassword form={form} step={step} />
          {step >= 2 && <NameSurname form={form} step={step} />}
          {step >= 3 && <TelEmail form={form} step={step} />}
        </Fragment>
      </AuthorizationForm>
    </Fragment>
  );
};
