/* eslint-disable import/first */
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@washingtonpost/wpds-ui-kit";

// we still need _document in order to set html lang
// and avoid Next.js error  `Warning: next-head-count is missing`

class ArticleDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    if (!context.pageProps) {
      return initialProps;
    }

    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ArticleDocument;
