import { ButtonThemes } from 'constants/button-themes';
import { ModalErrors, ModalSuccess } from 'constants/modal-texts';
import { Statuses } from 'constants/statuses';
import { ValidationNames } from 'constants/validation-names';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { pickValidation } from 'shared/helpers/pick-validation';
import { useAppDispatch } from 'shared/hooks/use-app-dispatch';
import { Button } from 'shared/ui/button/button';
import { EmailField } from 'shared/ui/email-field/email-field';
import { Login } from 'shared/ui/login/login';
import { Name } from 'shared/ui/name/name';
import { Password } from 'shared/ui/password/password';
import { Surname } from 'shared/ui/surname/surname';
import { Tel } from 'shared/ui/tel/tel';
import { Tooltip } from 'shared/ui/tooltip/tooltip';
import { changeUserInfo, getUser } from 'store/actions/user-actions';
import { userSelector } from 'store/selectors/user-selector';
import { setIsError, setIsSuccess } from 'store/slices/loading-slice';
import { ProfileInputs } from 'types/inputs';

import { ProfileSubtitle } from '../profile-subtitle/profile-subtitle';
import { ProfileTitle } from '../profile-title/profile-title';

import styles from './profile-data.module.scss';

export const ProfileData = () => {
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoginBlur, setIsLoginBlur] = useState(false);
  const [isPasswordBlur, setIsPasswordBlur] = useState(false);

  const { user, loadingInfo } = useSelector(userSelector);
  const { username, lastName, firstName, phone, email } = user;

  useEffect(() => {
    if (loadingInfo === Statuses.FAILED) {
      dispatch(setIsError({ isError: true, text: ModalErrors.CHANGES }));
    }

    if (loadingInfo === Statuses.SUCCEDED) {
      dispatch(setIsSuccess({ isSuccess: true, text: ModalSuccess.CHANGES }));
      dispatch(getUser());
    }
  }, [dispatch, loadingInfo]);

  const {
    handleSubmit,
    reset,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm<ProfileInputs>({
    mode: 'all',
    defaultValues: {
      login: username,
      lastName,
      firstName,
      email,
      phone,
    },
  });

  const loginValidation = {
    ...register(ValidationNames.LOGIN, {
      disabled: isDisabled,
      validate: pickValidation(ValidationNames.LOGIN),
      onChange: () => {
        setIsLoginBlur(false);
      },
      onBlur: () => {
        setIsLoginBlur(true);
      },
    }),
  };

  const passwordValidation = {
    ...register(ValidationNames.PASSWORD, {
      disabled: isDisabled,
      validate: pickValidation(ValidationNames.PASSWORD),
      onChange: () => {
        setIsPasswordBlur(false);
      },
      onBlur: () => {
        setIsPasswordBlur(true);
      },
    }),
  };

  const isLoginBlurError = !!(isLoginBlur && errors.login && errors.login?.type !== 'required');
  const isPasswordBlurError = !!(isPasswordBlur && errors.password && errors.password?.type !== 'required');

  const nameValidation = {
    ...register(ValidationNames.NAME, {
      disabled: isDisabled,
    }),
  };

  const surnameValidation = {
    ...register(ValidationNames.SURNAME, {
      disabled: isDisabled,
    }),
  };

  const phoneValidation = {
    ...register(ValidationNames.PHONE, {
      disabled: isDisabled,
      validate: pickValidation(ValidationNames.PHONE),
      onChange: (e) => {
        setValue(ValidationNames.PHONE, e.target.value);
      },
    }),
  };

  const emailValidation = {
    ...register(ValidationNames.EMAIL, {
      required: true,
      disabled: isDisabled,
      validate: pickValidation(ValidationNames.EMAIL),
    }),
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
    reset();
  };

  const onSubmit = (data: ProfileInputs) => {
    dispatch(changeUserInfo(data));
  };

  return (
    <div className={styles.root}>
      <ProfileTitle>Учетные данные</ProfileTitle>
      <ProfileSubtitle>Здесь вы можете отредактировать информацию о себе</ProfileSubtitle>

      <form data-test-id='profile-form' onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Login
            placeholder='Логин'
            validation={loginValidation}
            showBorder={!!(isLoginBlurError || (errors.login?.type === 'required' && isLoginBlur))}
          >
            <Tooltip name={ValidationNames.LOGIN} errors={errors} isBlur={isLoginBlur} isBlurError={isLoginBlurError} />
          </Login>
          <Password
            validation={passwordValidation}
            showBorder={!!(isPasswordBlurError || (errors.password?.type === 'required' && isPasswordBlur))}
            showCheck={!!(!errors.password && watch('password'))}
            isEmpty={!watch('password')}
          >
            <Tooltip
              name={ValidationNames.PASSWORD}
              errors={errors}
              isBlur={isPasswordBlur}
              isBlurError={isPasswordBlurError}
            />
          </Password>
          <Name validation={nameValidation} showBorder={!!errors.firstName}>
            <Tooltip name={ValidationNames.NAME} errors={errors} />
          </Name>
          <Surname validation={surnameValidation} showBorder={!!errors.lastName}>
            <Tooltip name={ValidationNames.SURNAME} errors={errors} />
          </Surname>
          <Tel validation={phoneValidation} showBorder={!!errors.phone} phone={phone}>
            <Tooltip name={ValidationNames.PHONE} errors={errors} />
          </Tel>
          <EmailField validation={emailValidation} showBorder={!!errors.email}>
            <Tooltip name={ValidationNames.EMAIL} errors={errors} />
          </EmailField>
        </div>

        <div className={styles.btns}>
          <Button type='submit' theme={ButtonThemes.BOOKED} data-test-id='edit-button' onClick={handleEditSubmit}>
            Редактировать
          </Button>
          <Button type='submit' className={styles.submit} data-test-id='save-button' disabled={isDisabled}>
            сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
};
