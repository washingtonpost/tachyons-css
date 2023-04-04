const postCss = require("postcss");
const variables = require("postcss-css-variables");
const imports = require("postcss-import");
const combineMediaQuery = require("postcss-combine-media-query");
const cssnano = require("cssnano");

const plugins =  [
  imports,
  combineMediaQuery,
  cssnano({
    preset: ["advanced", { reduceIdents: false }]
  })
];

module.exports = function getProcessedModule(filePath) {
  const withVars = `@import "${filePath}";`;
  return postCss([...plugins, variables])
    .process(withVars, {
      from: "src/app.css",
      to: "dest/app.css"
    })
    .then(res => res.css);
};