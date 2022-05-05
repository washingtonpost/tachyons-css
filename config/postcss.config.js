const imports = require("postcss-import");
const combineMediaQuery = require("postcss-combine-media-query");
const cssnano = require("cssnano");

module.exports = {
  env: "production",
  map: { inline: false },
  plugins: [
    imports,
    combineMediaQuery,
    cssnano({
      preset: ["advanced", { reduceIdents: false }]
    })
  ]
};
