

import { createMuiTheme } from '@material-ui/core/styles';

const indigo = 'rgb(61,90,254)';
const orange = 'rgb(255,87,34)';

const Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto, sans-serif',
    ],
  },
  palette: {
    type: 'light',
    primary: {
      main: indigo,
    },
    secondary: {
      main: orange,
    },
    action: {
      hoverOpacity: 0.21,
    },
  },
});

export default Theme;

