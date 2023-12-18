import { GoogleTagManager } from '@next/third-parties/google' 
import '../style/global.scss';
import '../style/html.css';
import Footer from 'components/general/footer/Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,700i,900&display=swap"
                    rel="stylesheet"
                />
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