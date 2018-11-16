import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  progress: {
    margin: 'auto',
  },
};

const PageProgressBar = ({ classes }) => {
  return (
    <CircularProgress
      size={150}
      thickness={1}
      className={classes.progress}
      color="secondary"
    />
  );
};

PageProgressBar.propTypes = {
  classes: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
    ])
  ).isRequired,
};

export default withStyles(styles)(PageProgressBar);
