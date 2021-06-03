import '../style/global.scss';
import { useRouter } from 'next/router';

function U4App({ Component, pageProps }) {
  const router = useRouter();
  // When generating a PDF we want to completely switch the global styles.
  const isPrinting = ['/publications/[slug]/print', '/printpreview/[id]'].includes(router.route);
  return (
    <div className={isPrinting ? 'print-style' : 'main-style print-style'}>
      <Component {...pageProps} />
    </div>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default U4App;
