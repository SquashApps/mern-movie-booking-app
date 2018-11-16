import React from 'react';
import PropTypes from 'prop-types';

import Loadable from 'react-loadable';

import AppBar from '@material-ui/core/AppBar';
import TypoGraphy from '@material-ui/core/Typography';


const Header = () => {
  <AppBar
      position="fixed"
      color="primary"
    >
      <TypoGraphy>
        Book Flicks
    </TypoGraphy>
    </AppBar>;
};
