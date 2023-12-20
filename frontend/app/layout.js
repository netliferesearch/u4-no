import { GoogleTagManager } from '@next/third-parties/google' 
import { Lato } from 'next/font/google';

import '../style/global.scss';
import '../style/html.css';
import Footer from 'components/general/footer/Footer';

const lato = Lato({
  weight: ['400', '700'], // 300 and 900 left out
  style: ['normal'], // 'italic' left out
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${lato.variable}`} >
            <head>
                <link rel="preconnect" href="https://cdn.sanity.io" />
            </head>
            <body>
                <div className='m'>
                    {children}
                    <Footer />
                </div>
            </body>
            <GoogleTagManager gtmId="GTM-KVW5J96" />
        </html>
    )
}