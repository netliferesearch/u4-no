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
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default U4Document;
