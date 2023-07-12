import { Fragment } from 'react';

import { ValidationNames } from '../../../constants/validation-names';
import { FieldProps } from '../../../types/field-props';
import { LabelWrapper } from '../label-wrapper/label-wrapper';

export const Login = ({ validation, children, showBorder, placeholder }: FieldProps) => (
  <LabelWrapper>
    <Fragment>
      <input
        className={showBorder ? 'border-error' : ''}
        type='text'
        autoComplete={ValidationNames.USERNAME}
        placeholder={placeholder || 'Придумайте логин для входа'}
        {...validation}
      />
      {children}
    </Fragment>
  </LabelWrapper>
);
