// next.config.js
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js"
});
module.exports = withNextra({
  basePath: "/tachyons",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tachyons",
        basePath: false,
        permanent: false
      }
    ];
  }
});
