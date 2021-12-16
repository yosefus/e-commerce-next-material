import { createTheme, ThemeProvider, CssBaseline, Paper } from '@mui/material';
import '../styles/globals.css';
import Layout from './../components/Layouts/Layout';

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
    palette: {
      primary: {
        main: '#330033',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Paper>
    </ThemeProvider>
  );
}

export default MyApp;
