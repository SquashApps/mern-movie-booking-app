import React, { Fragment } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loadable from 'react-loadable';

const HeaderLoadable = Loadable({
  loader: () => import('../Header'),
  loading: () => null,
});

const SectionLoadable = Loadable({
  loader: () => import('../Section'),
  loading: () => null,
});

const AppComponent = ({ genres, seats }) => (
  <Fragment>
    <HeaderLoadable genres={genres} />
    <SectionLoadable seats={seats} />
  </Fragment>
);

AppComponent.propTypes = {
  genres: ImmutablePropTypes.List,
  seats: ImmutablePropTypes.List,
};
export default AppComponent;
