/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ThemeProvider } from 'emotion-theming';
import Head from 'next/head';
import theme from '../theme';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Prompt|Sarabun&display=swap" rel="stylesheet" />
    </Head>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
