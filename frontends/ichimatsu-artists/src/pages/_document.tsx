import { Html, Head, Main, NextScript } from "next/document";

const Document = (): JSX.Element => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/dss1coc.css"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
