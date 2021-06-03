import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

/**
 * Support switchable global styling
 * See: https://pulkitgoyal.in/conditional-global-stylesheets-for-nextjs-apps
 */
const CSSMain = dynamic(() => import('../components/CSSMain'));
const CSSPrint = dynamic(() => import('../components/CSSPrint'));

function U4App({ Component, pageProps }) {
  const router = useRouter();
  // When generating a PDF we want to completely switch the global styles.
  const printPaths = ['/publications/[slug]/print', '/printpreview/[id]'];
  return (
    <>
      {printPaths.includes(router.route) ? <CSSPrint /> : <CSSMain />}
      <Component {...pageProps} />
    </>
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
