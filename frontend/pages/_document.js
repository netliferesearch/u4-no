import Document, { Html, Head, Main, NextScript } from 'next/document';

class U4Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
        // Issue workaround for React v16.
        // See https://github.com/facebook/react/issues/20829#issuecomment-802088260
        if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;
        `,
          }}
        />
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://cdn.sanity.io" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default U4Document;
