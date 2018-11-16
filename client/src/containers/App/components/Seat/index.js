import React from 'react';
import PropTypes from 'prop-types';
import { ImmutableProptypes } from 'react-immutable-proptypes';
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
      onClick={handleSeatClick}
    >
      {seat.get('seatNo')}
    </span>
  );
};

Seat.propTypes = {
  seat: ImmutableProptypes.Map.isrequired,
  handleSeatClick: PropTypes.func,
};

export default Seat;
