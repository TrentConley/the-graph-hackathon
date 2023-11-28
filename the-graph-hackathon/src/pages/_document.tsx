// src/pages/_document.tsx

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Place any custom tags you need in the Head here */}
                    {/* Example: link tags for fonts, meta tags, etc. */}
                </Head>
                <body>
                    {/* Here we render the main app */}
                    <Main />
                    {/* NextScript is where Next.js will inject its scripts */}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
