import { UseFormReturn } from 'react-hook-form';

import { RegInputs } from '../../../types/inputs';

export type StepProps = {
  form: UseFormReturn<RegInputs>;
  step: number;
};
