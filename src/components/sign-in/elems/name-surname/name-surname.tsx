import { ValidationNames } from 'constants/validation-names';

import { Fragment } from 'react';
import { StepProps } from 'components/sign-in/types/step-props';
import { AuthorizationStep } from 'shared/ui/authorization-step/authorization-step';
import { Name } from 'shared/ui/name/name';
import { Surname } from 'shared/ui/surname/surname';
import { Tooltip } from 'shared/ui/tooltip/tooltip';

import { RedirectToLogin } from '../redirect-to-login/redirect-to-login';
import { Top } from '../top/top';

export const NameSurname = ({ form, step }: StepProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  const nameValidation = {
    ...register(ValidationNames.NAME, {
      required: true,
    }),
  };

  const surnameValidation = {
    ...register(ValidationNames.SURNAME, {
      required: true,
    }),
  };

  return (
    <AuthorizationStep
      isHidden={step > 2}
      Top={<Top step={step} />}
      Fields={
        <Fragment>
          <Name validation={nameValidation} showBorder={!!errors.firstName}>
            <Tooltip name={ValidationNames.NAME} errors={errors} />
          </Name>
          <Surname validation={surnameValidation} showBorder={!!errors.lastName}>
            <Tooltip name={ValidationNames.SURNAME} errors={errors} />
          </Surname>
        </Fragment>
      }
      isDisabled={!!Object.keys(errors).length}
      submitText='последний шаг'
      Redirect={<RedirectToLogin />}
    />
  );
};
