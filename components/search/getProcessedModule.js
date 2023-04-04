const postCss = require("postcss");
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
  return postCss([...plugins])
    .process(withVars, {
      from: "src/app.css",
      to: "dest/app.css"
    })
    .then(res => res.css);
};