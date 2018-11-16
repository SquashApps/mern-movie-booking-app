import React from 'react';
// import PropTypes from 'prop-types';
import { ImmutablePropTypes } from 'react-immutable-proptypes';
import Loadble from 'react-loadable';
import './Section.css';

const SeatLoadable = Loadble({
  loader: () => import('../Seat'),
  loading: () => null,
});

const Section = ({ seats }) => (
  <section className="page__content">
    <div className="seats__wrapper">
      {seats.map(seat => (
        <SeatLoadable seat={seat} />
        ))}
    </div>
    <div className="screen_illuminator">
        Screen
    </div>
  </section>
);

Section.propTypes = {
  seats: ImmutablePropTypes.List.isRequired,
};

export default Section;
