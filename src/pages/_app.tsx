/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ThemeProvider } from 'emotion-theming';
import { CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import firebaseConfig from '../constants/firebase.config';
import theme from '../theme';
import StoreProvider from '../components/StoreProvider';

const App = ({ Component, pageProps }) => {
  const [db, setDB] = useState(null);
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    setDB(firebase.firestore());
  }, []);
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
        <StoreProvider firebaseDB={db}>
          <Component {...pageProps} />
        </StoreProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
