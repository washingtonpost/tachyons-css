import "nextra-theme-docs/style.css";
import "./../src/index.css";
import "./../components/compat-layer.css";

export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
