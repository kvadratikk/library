import { Fragment } from 'react';

import { ValidationNames } from '../../../constants/validation-names';
import { FieldProps } from '../../../types/field-props';
import { LabelWrapper } from '../label-wrapper/label-wrapper';

export const Name = ({ validation, children, showBorder }: FieldProps) => (
  <LabelWrapper>
    <Fragment>
      <input
        name={ValidationNames.NAME}
        className={showBorder ? 'border-error' : ''}
        type='text'
        placeholder='Имя'
        {...validation}
      />

      {children}
    </Fragment>
  </LabelWrapper>
);
