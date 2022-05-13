// next.config.js
const withNextra = require("nextra")({
  experimental: {
    turboMode: true
  },
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
