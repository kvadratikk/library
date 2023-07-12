import { AppRoutes } from 'constants/app-routes';
import { Statuses } from 'constants/statuses';
import { ValidationNames } from 'constants/validation-names';

import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { AuthorizationForm } from 'shared/ui/authorization-form/authorization-form';
import { AuthorizationFormRedirectToRegistration } from 'shared/ui/authorization-form-redirect-to-registration/authorization-form-redirect-to-registration';
import { AuthorizationStep } from 'shared/ui/authorization-step/authorization-step';
import { Login } from 'shared/ui/login/login';
import { Password } from 'shared/ui/password/password';
import { Tooltip } from 'shared/ui/tooltip/tooltip';
import { createAuthUser } from 'store/actions/authorization-actions';
import { authorizationSelector } from 'store/selectors/authorization-selector';
import { setIsLoading } from 'store/slices/loading-slice';
import { AuthInputs } from 'types/inputs';

import { ForgotData } from './elems/forgot-data/forgot-data';
import { Hint } from './elems/hint/hint';
import { LogInModalFail } from './elems/log-in-modal-fail/log-in-modal-fail';
import { Title } from './elems/title/title';

export const LogIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, code } = useSelector(authorizationSelector);

  const [, setIsLoginBlur] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const otherCode = code && code !== 200 && code !== 400;

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthInputs>({
    mode: 'all',
  });

  const loginValidation = {
    ...register(ValidationNames.IDENTIFIER, {
      required: true,
      onChange: () => {
        setIsTyping(true);
        setIsLoginBlur(false);
      },
      onBlur: () => {
        setIsLoginBlur(true);
      },
    }),
  };

  const passwordValidation = {
    ...register(ValidationNames.PASSWORD, {
      required: true,
      onChange: () => {
        setIsTyping(true);
      },
    }),
  };

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED || loading === Statuses.SUCCEDED) dispatch(setIsLoading(false));

    if (code === 400) setIsTyping(false);
    if (code === 200) navigate(AppRoutes.BOOKS);
  }, [code, dispatch, loading, navigate]);

  const onSubmit: SubmitHandler<AuthInputs> = (data) => {
    dispatch(createAuthUser(data));
  };

  return (
    <Fragment>
      {otherCode && <LogInModalFail onClick={() => onSubmit(getValues())} />}

      <AuthorizationForm testId='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <AuthorizationStep
          Top={<Title />}
          Fields={
            <Fragment>
              <Login
                placeholder='Логин'
                validation={loginValidation}
                showBorder={!!(errors.identifier || code === 400)}
              >
                <Tooltip errors={errors} name={ValidationNames.IDENTIFIER} />
              </Login>
              <Password
                validation={passwordValidation}
                showBorder={!!(errors.password || code === 400)}
                showCheck={false}
                isEmpty={!watch(ValidationNames.PASSWORD)}
              >
                <Tooltip errors={errors} name={ValidationNames.PASSWORD} isEmpty={true} />
              </Password>
            </Fragment>
          }
          Bottom={
            <Fragment>
              {code === 400 && <Hint />}
              <ForgotData code={code} />
            </Fragment>
          }
          isDisabled={code === 400 && !isTyping}
          submitText='вход'
          Redirect={<AuthorizationFormRedirectToRegistration />}
        />
      </AuthorizationForm>
    </Fragment>
  );
};
