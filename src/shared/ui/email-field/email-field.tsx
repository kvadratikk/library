import { Fragment } from 'react';

import { FieldProps } from '../../../types/field-props';
import { LabelWrapper } from '../label-wrapper/label-wrapper';

export const EmailField = ({ validation, children, showBorder }: FieldProps) => (
  <LabelWrapper>
    <Fragment>
      <input className={showBorder ? 'border-error' : ''} type='email' placeholder='E-mail' {...validation} />

      {children}
    </Fragment>
  </LabelWrapper>
);
