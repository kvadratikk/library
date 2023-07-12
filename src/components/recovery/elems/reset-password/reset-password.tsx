import { Statuses } from 'constants/statuses';
import { ValidationNames } from 'constants/validation-names';

import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { pickValidation } from 'shared/helpers/pick-validation';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { AuthorizationForm } from 'shared/ui/authorization-form/authorization-form';
import { AuthorizationStep } from 'shared/ui/authorization-step/authorization-step';
import { Password } from 'shared/ui/password/password';
import { Tooltip } from 'shared/ui/tooltip/tooltip';
import { resetPassword } from 'store/actions/recovery-actions';
import { recoverySelector } from 'store/selectors/recovery-selector';
import { setIsLoading } from 'store/slices/loading-slice';
import { resetRecovery } from 'store/slices/recovery-slice';
import { PasswordsInputs } from 'types/inputs';

import { ResetModalFail } from '../reset-modal-fail/reset-modal-fail';
import { ResetModalSuccess } from '../reset-modal-success/reset-modal-success';
import { Title } from '../title/title';

export const ResetPassword = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { loading } = useSelector(recoverySelector);

  const [isPasswordBlur, setIsPasswordBlur] = useState(false);
  const [isNotMatch, setIsNotMatch] = useState(false);

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED || loading === Statuses.SUCCEDED) dispatch(setIsLoading(false));
  }, [dispatch, loading]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordsInputs>({
    mode: 'all',
  });

  const passwordsMatch = () => watch(ValidationNames.PASSWORD) === watch(ValidationNames.PASSWORD_CONFIRMATION);

  const passwordValidate = pickValidation(ValidationNames.PASSWORD);

  const passwordValidation = {
    ...register(ValidationNames.PASSWORD, {
      required: true,
      validate: passwordValidate,
      onChange: () => {
        setIsPasswordBlur(false);
      },
      onBlur: () => {
        setIsPasswordBlur(true);
      },
    }),
  };

  const isPasswordBlurError = !!(isPasswordBlur && errors.password && errors.password?.type !== 'required');

  const repeatValidation = {
    ...register(ValidationNames.PASSWORD_CONFIRMATION, {
      required: true,
      onChange: () => {
        setIsNotMatch(false);
      },
      onBlur: () => {
        if (!passwordsMatch()) setIsNotMatch(true);
      },
    }),
  };

  const onSubmit: SubmitHandler<PasswordsInputs> = (data) => {
    if (!passwordsMatch()) setIsNotMatch(true);

    const code = search.split('?code=')[1];

    dispatch(resetPassword({ ...data, code }));
  };

  return (
    <Fragment>
      {loading === Statuses.SUCCEDED && <ResetModalSuccess />}
      {loading === Statuses.FAILED && (
        <ResetModalFail
          onClick={() => {
            dispatch(resetRecovery());
          }}
        />
      )}

      <AuthorizationForm testId='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
        <AuthorizationStep
          Top={<Title />}
          Fields={
            <Fragment>
              <Password
                placeholder='Новый пароль'
                validation={passwordValidation}
                showBorder={!!(isPasswordBlurError || (errors.password?.type === 'required' && isPasswordBlur))}
                showCheck={!!(!errors.password && watch(ValidationNames.PASSWORD))}
                isEmpty={!watch(ValidationNames.PASSWORD)}
              >
                <Tooltip
                  name={ValidationNames.PASSWORD}
                  errors={errors}
                  isBlur={isPasswordBlur}
                  isBlurError={isPasswordBlurError}
                />
              </Password>
              <Password
                placeholder='Повторите пароль'
                validation={repeatValidation}
                showBorder={!!(isNotMatch || errors?.[ValidationNames.PASSWORD_CONFIRMATION])}
                showCheck={false}
                isEmpty={!watch(ValidationNames.PASSWORD_CONFIRMATION)}
              >
                <Tooltip errors={errors} name={ValidationNames.PASSWORD_CONFIRMATION} isNotMatch={isNotMatch} />
              </Password>
            </Fragment>
          }
          isDisabled={isNotMatch}
          submitText='сохранить изменения'
          Redirect='После сохранения войдите в библиотеку, используя новый пароль'
        />
      </AuthorizationForm>
    </Fragment>
  );
};
