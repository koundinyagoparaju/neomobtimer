import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <title>Mob timer</title>
                    <meta name="description" content="A timer which can be used in mob programming"/>
                    <meta name="google-site-verification" content="LEX7F0JLWRkAZuamUP0vx_d3enp7tIlNBBhRLqoZBQw" />
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument;