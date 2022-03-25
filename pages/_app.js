import { CssBaseline, Paper } from '@mui/material';
import '../styles/globals.css';
import Layout from './../components/Layouts/Layout';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
// import { theme } from '../styles/themes/themes';
import StoreProvider from '../utils/Store';
// import { StoreProvider } from './../utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
      disable: 'mobile',
    });
  }, []);

  const LangPaper = styled(Paper)((/* { theme } */) => ({
    // direction: theme.lang.dir,
  }));

  return (
    <StoreProvider>
      <CssBaseline />
      <LangPaper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </LangPaper>
    </StoreProvider>
  );
}

export default MyApp;
