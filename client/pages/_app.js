import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import GlobalStateProvider from 'store/GlobalStateProvider';

import '../styles/globals.css';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#151515',
      // light: '',
    },
    secondary: {
      main: '#242424',
      // main: '#cccccc',
      // main: '#4a4a4a',
      // main: '#e6e6e6',
      // dark: '',
    },
    accent: {
      main: '#0971f1',
    },
    text: {
      main: '#e6e6e6',
      accent: '#565656',
      lightContrast: '#1e1e1e',
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        backgroundColor: '#151515',
        '&$selected': {
          backgroundColor: '#0971f1',
          '&:hover': {
            backgroundColor: '#0650ab',
          },
        },
      },
      button: {
        '&:hover': {
          backgroundColor: '#242424',
        },
      },
      gutters: {
        padding: '1em',
      },
    },

    MuiListItemText: {
      root: {
        color: '#e6e6e6',
        '&$selected': {
          color: '#1e1e1e',
        },
      },
    },

    MuiDivider: {
      root: {
        backgroundColor: '#242424',
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <style global jsx>{`
          body {
            height: 100vh;
            overflow-y: hidden;
          }
          #__next {
            height: 100%;
          }
        `}</style>
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default MyApp;
