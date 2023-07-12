import { SortName, SortType } from 'constants/sort';

export type Sort = Partial<Record<SortName, SortType>>;

export const SortText = {
  [SortName.TITLE]: 'По названию',
  [SortName.AUTHORS]: 'По автору',
};
