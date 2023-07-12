import { ValidationNames } from 'constants/validation-names';

import { Fragment } from 'react';
import { StepProps } from 'components/sign-in/types/step-props';
import { pickValidation } from 'shared/helpers/pick-validation';
import { AuthorizationStep } from 'shared/ui/authorization-step/authorization-step';
import { EmailField } from 'shared/ui/email-field/email-field';
import { Tel } from 'shared/ui/tel/tel';
import { Tooltip } from 'shared/ui/tooltip/tooltip';

import { RedirectToLogin } from '../redirect-to-login/redirect-to-login';
import { Top } from '../top/top';

export const TelEmail = ({ form, step }: StepProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const phoneValidate = pickValidation(ValidationNames.PHONE);
  const phoneValidation = {
    ...register(ValidationNames.PHONE, {
      required: true,
      validate: phoneValidate,
      onChange: (e) => {
        setValue(ValidationNames.PHONE, e.target.value);
      },
    }),
  };

  const emailValidate = pickValidation(ValidationNames.EMAIL);
  const emailValidation = {
    ...register(ValidationNames.EMAIL, {
      required: true,
      validate: emailValidate,
    }),
  };

  return (
    <AuthorizationStep
      Top={<Top step={step} />}
      Fields={
        <Fragment>
          <Tel validation={phoneValidation} showBorder={!!errors.phone}>
            <Tooltip name={ValidationNames.PHONE} errors={errors} />
          </Tel>
          <EmailField validation={emailValidation} showBorder={!!errors.email}>
            <Tooltip name={ValidationNames.EMAIL} errors={errors} />
          </EmailField>
        </Fragment>
      }
      isDisabled={!!Object.keys(errors).length}
      submitText='зарегистрироваться'
      Redirect={<RedirectToLogin />}
    />
  );
};
