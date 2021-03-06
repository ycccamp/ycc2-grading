/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ThemeProvider } from 'emotion-theming';
import { CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import theme from '../theme';
import StoreProvider from '../components/StoreProvider';
import Authentication from '../components/Authentication';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>YCC Grading</title>
        <link href="https://fonts.googleapis.com/css?family=Prompt|Sarabun&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Global
          styles={css`
            html,
            body {
              height: 100%;
            }
            #__next {
              height: 100%;
            }
          `}
        />
        <StoreProvider>
          <Authentication>
            <Component {...pageProps} />
          </Authentication>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
