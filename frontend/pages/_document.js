import { GoogleTagManager } from '@next/third-parties/google';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class U4Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900&display=swap"
            rel="stylesheet"
            media="print"
          />
          <link rel="preconnect" href="https://cdn.sanity.io" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <GoogleTagManager gtmId="GTM-KVW5J96" />
      </Html>
    );
  }
}

export default U4Document;
