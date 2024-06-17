import "./../src/nextra.css";
import React from "react";
import { getCssText, globalStyles } from "@washingtonpost/wpds-ui-kit";

export default function Nextra({ Component, pageProps }) {
  // global styles adds wpds fonts
  globalStyles();

  return <Component {...pageProps} />
}
