import { Statuses } from 'constants/statuses';
import { ValidationNames } from 'constants/validation-names';

import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { pickValidation } from 'shared/helpers/pick-validation';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { AuthorizationForm } from 'shared/ui/authorization-form/authorization-form';
import { AuthorizationFormRedirectToRegistration } from 'shared/ui/authorization-form-redirect-to-registration/authorization-form-redirect-to-registration';
import { AuthorizationStep } from 'shared/ui/authorization-step/authorization-step';
import { EmailField } from 'shared/ui/email-field/email-field';
import { Tooltip } from 'shared/ui/tooltip/tooltip';
import { forgotPassword } from 'store/actions/recovery-actions';
import { recoverySelector } from 'store/selectors/recovery-selector';
import { setIsLoading } from 'store/slices/loading-slice';
import { EmailInputs } from 'types/inputs';

import { ForgotModalSuccess } from '../forgot-modal-success/forgot-modal-success';
import { FormHeader } from '../form-header/form-header';
import { Title } from '../title/title';

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { loading, errorMessage } = useSelector(recoverySelector);

  const [, setIsEmailBlur] = useState(false);

  useEffect(() => {
    if (loading === Statuses.PENDING) dispatch(setIsLoading(true));
    if (loading === Statuses.FAILED || loading === Statuses.SUCCEDED) dispatch(setIsLoading(false));
  }, [dispatch, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInputs>({
    mode: 'onBlur',
  });

  const emailValidate = pickValidation(ValidationNames.EMAIL);
  const emailValidation = {
    ...register(ValidationNames.EMAIL, {
      required: true,
      validate: emailValidate,
      onChange: () => {
        setIsEmailBlur(false);
      },
      onBlur: () => {
        setIsEmailBlur(true);
      },
    }),
  };

  const onSubmit: SubmitHandler<EmailInputs> = (data) => {
    dispatch(forgotPassword(data));
  };

  return (
    <Fragment>
      {loading === Statuses.SUCCEDED && <ForgotModalSuccess />}

      <AuthorizationForm testId='send-email-form' onSubmit={handleSubmit(onSubmit)} Header={<FormHeader />}>
        <AuthorizationStep
          Top={<Title needMargin={true} />}
          Fields={
            <EmailField validation={emailValidation} showBorder={!!(errors.email || errorMessage)}>
              <Tooltip errors={errors} name={ValidationNames.EMAIL} errorMessage={!!errorMessage} forgot={true} />
            </EmailField>
          }
          submitText='восстановить'
          Redirect={<AuthorizationFormRedirectToRegistration />}
        />
      </AuthorizationForm>
    </Fragment>
  );
};
