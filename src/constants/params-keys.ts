export enum ParamsKeys {
  CATEGORY = 'filters[categories][path][$eq]',
  BOOKING = 'filters[booking][id][$null]',
  SEARCH = 'filters[$or][0][title][$containsi]',
  SEARCH_AUTHORS = 'filters[$or][1][authors][$containsi]',
  PAGE = 'pagination[page]',
  PAGE_SIZE = 'pagination[pageSize]',
  SORT = 'sort',
}
