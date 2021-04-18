import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import GlobalStateProvider from 'store/GlobalStateProvider';

import '../styles/globals.css';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#1e1e1e',
    },
    // secondary: {
    //   main: '#008891',
    // },
    // accent: {
    //   main: '#00587a',
    // },
    // text: {
    //   main: '#00587a',
    // },
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
