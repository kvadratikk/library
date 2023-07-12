import { FieldValues } from 'react-hook-form';

export type FieldProps = {
  validation: FieldValues;
  children: JSX.Element;
  showBorder: boolean;
  showCheck?: boolean;
  placeholder?: string;
  isEmpty?: boolean;
  phone?: string;
};
