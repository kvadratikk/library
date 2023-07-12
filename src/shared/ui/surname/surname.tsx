import { Fragment } from 'react';

import { ValidationNames } from '../../../constants/validation-names';
import { FieldProps } from '../../../types/field-props';
import { LabelWrapper } from '../label-wrapper/label-wrapper';

export const Surname = ({ validation, children, showBorder }: FieldProps) => (
  <LabelWrapper>
    <Fragment>
      <input
        name={ValidationNames.SURNAME}
        className={showBorder ? 'border-error' : ''}
        type='text'
        placeholder='Фамилия'
        {...validation}
      />

      {children}
    </Fragment>
  </LabelWrapper>
);
