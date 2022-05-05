const vars = require("postcss-css-variables");
const plugins = require("./../../../configs/postcss.plugins");

module.exports = [...plugins, vars];
