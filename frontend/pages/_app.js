import { Lato } from 'next/font/google';
import '../style/global.scss';
import { useRouter } from 'next/router';

const lato = Lato({
  weight: ['400', '700'], // 300 and 900 left out
  style: ['normal'], // 'italic' left out
  subsets: ['latin'],
  display: 'swap',
})

function U4App({ Component, pageProps }) {
  const router = useRouter();
  // When generating a PDF we want to completely switch the global styles.
  const isPrinting = ['/publications/[slug]/print', '/printpreview/[id]'].includes(router.route);
  return (
    <div className={isPrinting ? 'print-style' : 'm'}>
      {!isPrinting && (
        <style jsx global>
          {`
            html {
              font-size: 1em;
              line-height: 1.5;
              overflow-y: scroll;
              min-height: 100%;
              overflow-y: initial;
              --font-lato: ${lato.style.fontFamily}, 'KaiTi', 'STKaiti', 'Noto Serif TC', sans-serif;
            }
          `}
        </style>
      )}
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
