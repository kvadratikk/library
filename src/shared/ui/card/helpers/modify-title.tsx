import { Fragment } from 'react';

export const modifyTitle = (title: string, search: string) => {
  const regexp = new RegExp(`${search}`, 'gi');
  const searchWords = title.match(regexp);
  let key = 0;

  return title.split(regexp).map((word, idx) => {
    key += 1;

    return (
      <Fragment key={key}>
        {word}
        {searchWords?.[idx] && <span data-test-id='highlight-matches'>{searchWords[idx]}</span>}
      </Fragment>
    );
  });
};
