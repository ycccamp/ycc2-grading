/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ThemeProvider } from 'emotion-theming';
import { CSSReset } from '@chakra-ui/core';
import Head from 'next/head';
import theme from '../theme';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>YCC Grading</title>
      <link href="https://fonts.googleapis.com/css?family=Prompt|Sarabun&display=swap" rel="stylesheet" />
    </Head>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
