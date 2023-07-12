import { SortType } from '../../constants/sort';

type SortItemsArgs<T> = {
  array: T[];
  sort: SortType;
  key?: keyof T;
};

export const sortItems = <T>({ array, sort, key }: SortItemsArgs<T>) =>
  [...array].sort((a, b) => {
    const firstItem = Number(key ? a[key] : a);
    const secondItem = Number(key ? b[key] : a);

    if (sort === SortType.DESCENDING) return secondItem - firstItem;

    return firstItem - secondItem;
  });
