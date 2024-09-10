// pages/_app.js
import Head from 'next/head';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="../public/handshake.ico" />
        <title>LinkUpCareers</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
