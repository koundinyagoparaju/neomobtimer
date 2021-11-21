import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
                    <title>Mobtimer</title>
                    <meta name="description" content="A timer which can be used in mob programming. Add names and start the timer. Get a reminder/notification to pass the keyboard when the timer is up. Share the timer with in team with shareable link"/>
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