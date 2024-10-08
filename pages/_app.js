import Layout from '../app/layout'; // Adjust the import path if necessary
import '../app/globals.css'; // Ensure global styles are imported

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;