import { Fragment, useState } from 'react';
import { ReactComponent as Check } from 'shared/assets/icons/check.svg';
import { ReactComponent as Eye } from 'shared/assets/icons/eye.svg';
import { ReactComponent as EyeClosed } from 'shared/assets/icons/eye-closed.svg';
import { FieldProps } from 'types/field-props';

import { LabelWrapper } from '../label-wrapper/label-wrapper';

export const Password = ({ validation, children, showBorder, showCheck, placeholder, isEmpty }: FieldProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <LabelWrapper>
      <Fragment>
        <input
          className={showBorder ? 'border-error' : ''}
          type={isPasswordHidden ? 'password' : 'text'}
          autoComplete='current-password'
          placeholder={placeholder || 'Пароль'}
          {...validation}
        />
        {showCheck && <Check />}
        <button
          type='button'
          onClick={() => {
            setIsPasswordHidden(!isPasswordHidden);
          }}
        >
          {isEmpty ? '' : isPasswordHidden ? <EyeClosed /> : <Eye />}
        </button>

        {children}
      </Fragment>
    </LabelWrapper>
  );
};
