import { Fragment, useState } from 'react';
import MaskedInput from 'react-text-mask';

import { ValidationNames } from '../../../constants/validation-names';
import { FieldProps } from '../../../types/field-props';
import { LabelWrapper } from '../label-wrapper/label-wrapper';

export const Tel = ({ validation, children, showBorder, phone }: FieldProps) => {
  const [isPhoneFocus, setIsPhoneFocus] = useState(false);
  const mask = ['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  return (
    <LabelWrapper>
      <Fragment>
        <MaskedInput
          onFocus={() => setIsPhoneFocus(true)}
          pipe={phone && !isPhoneFocus ? () => phone : undefined}
          name={ValidationNames.PHONE}
          mask={mask}
          className={showBorder ? 'border-error' : ''}
          type='tel'
          placeholder='Номер телефона'
          placeholderChar='x'
          {...validation}
        />
        {children}
      </Fragment>
    </LabelWrapper>
  );
};
