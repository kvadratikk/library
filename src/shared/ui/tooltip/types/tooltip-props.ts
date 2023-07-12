import { FieldErrors, FieldValues } from 'react-hook-form';

import { ValidationNames } from '../../../../constants/validation-names';

export type TooltipProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: ValidationNames;
  isBlur?: boolean;
  isBlurError?: boolean;
  isNotMatch?: boolean;
  isEmpty?: boolean;
  errorMessage?: boolean;
  forgot?: boolean;
};
