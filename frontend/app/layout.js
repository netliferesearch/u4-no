import Script from 'next/script';
import '../style/global.scss';
import '../style/html.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Script id="google-tag-manager" strategy="afterInteractive"> 
                (false && {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KVW5J96')
                `})
            </Script>
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
                </div>
            </body>
        </html>
    )
}