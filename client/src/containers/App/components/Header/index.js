import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TypoGraphy from '@material-ui/core/Typography';

const styles = theme => ({
  logoText: {
    margin: theme.spacing.unit * 2,
  },
});
// eslint-disable-next-line
const Header = ({ genres, classes }) => (
  <AppBar
    position="fixed"
    color="primary"
  >
    <TypoGraphy
      align="center"
      classes={{
        root: classes.logoText,
      }}
      variant="h6"
      color="inherit"
    >
        Book Flicks
    </TypoGraphy>
  </AppBar>
);

Header.propTypes = {
  genres: ImmutablePropTypes.map,
  classes: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
    ])
  ).isRequired,
};

export default withStyles(styles)(Header);
