import React, { Component, Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/global.css';

// actions
import { getMovieGenres, getSeats, toggleSeatBookingStatus } from '../../redux/seats/action';

// selectors

import { makeMovieGenreSelector, makeSelectSeatsSelector, makeSelectRequestStatusSelector, makeSelectNotAvailabilitySelector } from '../../redux/seats/selectors';

// components
import AppComponent from './components/AppComponent';
import PageProgressBar from '../../components/PageProgressBar';
import AlertModal from '../../components/AlertModal';


class App extends Component {
    static propTypes = {
      getMovieGenres: PropTypes.func.isRequired,
    }

    state = {
      open: false,
    }

    componentDidMount() {
      this.props.getMovieGenres();

      // TODO: Add a dropdown to fetch seats based on movies and genre
      this.props.getSeats();
    }

    componentWillReceiveProps(props) {
      const { shouldShowNotAvailableMessage } = props;

      if (shouldShowNotAvailableMessage === true && this.props.shouldShowNotAvailableMessage) {
        this.setState({ open: true });
      }
    }

    handleClose = () => this.setState({ open: false });


    render() {
      const {
        seats,
        genres,
        isRequestPending,
        shouldShowNotAvailableMessage,
      } = this.props;
      const { open } = this.state;
      const { handleClose } = this;

      if (isRequestPending === false) {
        return (
          <Fragment>
            <AppComponent seats={seats} genres={genres} {...this.props} />
            {shouldShowNotAvailableMessage &&
              <AlertModal open={open} handleClose={handleClose} content="seat not available for booking" />
            }
          </Fragment>
        );
      }

      return (
        <PageProgressBar isRequestPending />
      );
    }
}

const mapStateToProps = createStructuredSelector({
  seats: makeSelectSeatsSelector(),
  genres: makeMovieGenreSelector(),
  isRequestPending: makeSelectRequestStatusSelector(),
  shouldShowNotAvailableMessage: makeSelectNotAvailabilitySelector()  
});

const mapDispatchToProps = dispatch => ({
  getMovieGenres: () => dispatch(getMovieGenres.request()),
  getSeats: () => dispatch(getSeats.request()),
  toggleSeatBookingStatus: data => dispatch(toggleSeatBookingStatus.request(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
