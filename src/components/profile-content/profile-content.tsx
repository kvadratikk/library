import { Fragment } from 'react';

import { ProfileAvatar } from './elems/profile-avatar/profile-avatar';
import { ProfileBookBooked } from './elems/profile-book-booked/profile-book-booked';
import { ProfileBookHanded } from './elems/profile-book-handed/profile-book-handed';
import { ProfileBooksHistory } from './elems/profile-books-history/profile-books-history';
import { ProfileData } from './elems/profile-data/profile-data';

export const ProfileContent = () => (
  <Fragment>
    <ProfileAvatar />
    <ProfileData />
    <ProfileBookBooked />
    <ProfileBookHanded />
    <ProfileBooksHistory />
  </Fragment>
);
