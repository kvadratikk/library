import { ValidationNames } from 'constants/validation-names';

import { Fragment, useState } from 'react';
import { StepProps } from 'components/sign-in/types/step-props';
import { pickValidation } from 'shared/helpers/pick-validation';
import { AuthorizationStep } from 'shared/ui/authorization-step/authorization-step';
import { Login } from 'shared/ui/login/login';
import { Password } from 'shared/ui/password/password';
import { Tooltip } from 'shared/ui/tooltip/tooltip';

import { RedirectToLogin } from '../redirect-to-login/redirect-to-login';
import { Top } from '../top/top';

export const LoginPassword = ({ form, step }: StepProps) => {
  const [isLoginBlur, setIsLoginBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const loginValidate = pickValidation(ValidationNames.USERNAME);
  const loginValidation = {
    ...register(ValidationNames.USERNAME, {
      required: true,
      validate: loginValidate,
      onChange: () => {
        setIsLoginBlur(false);
      },
      onBlur: () => {
        setIsLoginBlur(true);
      },
    }),
  };

  const isLoginBlurError = !!(isLoginBlur && errors.username && errors.username?.type !== 'required');

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

  const isPasswordBlurError = isPasswordBlur && errors.password && errors.password?.type !== 'required';

  return (
    <AuthorizationStep
      isHidden={step > 1}
      Top={<Top step={step} />}
      Fields={
        <Fragment>
          <Login
            validation={loginValidation}
            showBorder={!!(isLoginBlurError || (errors.username?.type === 'required' && isLoginBlur))}
          >
            <Tooltip
              name={ValidationNames.USERNAME}
              errors={errors}
              isBlur={isLoginBlur}
              isBlurError={isLoginBlurError}
            />
          </Login>
          <Password
            validation={passwordValidation}
            showBorder={!!(isPasswordBlurError || (errors.password?.type === 'required' && isPasswordBlur))}
            showCheck={!!(!errors.password && watch('password'))}
            isEmpty={!watch('password')}
          >
            <Tooltip
              errors={errors}
              name={ValidationNames.PASSWORD}
              isBlur={isPasswordBlur}
              isBlurError={isPasswordBlurError}
            />
          </Password>
        </Fragment>
      }
      isDisabled={!!(isLoginBlurError || isPasswordBlurError || Object.keys(errors).length)}
      submitText='следующий шаг'
      Redirect={<RedirectToLogin />}
    />
  );
};
