import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
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

class AppComponent extends Component {
  static propTypes = {
    toggleSeatBookingStatus: PropTypes.func.isRequired,
    seats: ImmutablePropTypes.list.isRequired,
  }


  handleSeatClick = (e, seat) => {
    const { checkAndSetStatus } = this;
    const { toggleSeatBookingStatus } = this.props;

    const status = checkAndSetStatus(seat);
    const payload = {
      seatID: seat.get('_id'),
      status,
    };

    toggleSeatBookingStatus(payload);
  }

  checkAndSetStatus = (seat) => {
    if (seat.get('bookingStatus') === 'OPEN' || seat.get('bookingStatus') === 'CANCELLED') {
      return 'CLOSED';
    }

    if (seat.get('bookingStatus') === 'CLOSED') {
      return 'CANCELLED';
    }
    return 'OPEN';
  }

  render() {
    // eslint-disable-next-line
    const { genres, seats } = this.props;
    const { handleSeatClick } = this;

    return (
      <Fragment>
        <HeaderLoadable genres={genres} />
        <SectionLoadable seats={seats} handleSeatClick={handleSeatClick} />
      </Fragment>
    );
  }
}

export default AppComponent;
