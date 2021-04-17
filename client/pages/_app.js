import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import GlobalStateProvider from 'store/GlobalStateProvider';

import '../styles/globals.css';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default MyApp;
