import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/global.css';

// actions
import { getMovieGenres, getSeats } from '../../redux/seats/action';

// selectors

import { makeMovieGenreSelector, makeSelectSeatsSelector, makeSelectRequestStatusSelector } from '../../redux/seats/selectors';

// components
import AppComponent from './components/AppComponent';

import PageProgressBar from '../../components/PageProgressBar';


class App extends Component {
    static propTypes = {
      getMovieGenres: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.props.getMovieGenres();
      this.props.getSeats();
    }

    render() {
      const { seats, genres, isRequestPending } = this.props;
      if (isRequestPending === false) {
        return (
          <AppComponent seats={seats} genres={genres} {...this.props} />
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
});

const mapDispatchToProps = dispatch => ({
  getMovieGenres: () => dispatch(getMovieGenres.request()),
  getSeats: () => dispatch(getSeats.request())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
