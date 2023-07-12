type SearchItemsArgs<T> = {
  array: T[];
  key?: keyof T;
  search: string;
};

export const searchItems = <T>({ array, key, search }: SearchItemsArgs<T>) =>
  array.filter((item) =>
    String(key ? item[key] : item)
      .toLowerCase()
      .includes(search.toLowerCase())
  );
