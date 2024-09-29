import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'; // Add this import
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google tag (gtag.js) */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-21Z3GM24H1"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-21Z3GM24H1');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;