import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import './Seat.css';


const checkBookingStatus = (seat) => {
  return (seat.get('bookingStatus') === 'CLOSED');
};

const Seat = ({ seat, handleSeatClick }) => {
  return (
    <span
      key={seat.get('_id')}
      className={
          classNames('seat', {
              booked: checkBookingStatus(seat),
          })
        }
      role="presentation"
      onClick={ev => handleSeatClick(ev, seat)}
    >
      {seat.get('seatNo')}
    </span>
  );
};

Seat.propTypes = {
  seat: ImmutablePropTypes.map.isRequired,
  handleSeatClick: PropTypes.func,
};

export default Seat;
