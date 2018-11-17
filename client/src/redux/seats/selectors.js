import { createSelector } from 'reselect';

export const selectSeat = state => state.get('seat');

export const makeMovieGenreSelector = () => createSelector(
  [selectSeat], movieState => movieState.get('genres')
);

export const makeSelectSeatsSelector = () => createSelector(
  [selectSeat], seatState => seatState.get('seats')
);

export const makeSelectRequestStatusSelector = () => createSelector(
  [selectSeat], seatState => seatState.get('isRequestPending')
);

export const makeSelectNotAvailabilitySelector = () => createSelector(
  [selectSeat], seatState => seatState.get('shouldShowNotAvailableMessage')
);

