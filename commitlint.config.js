const { readdirSync, statSync } = require("fs");
const { join } = require("path");

const packages = readdirSync("./packages").filter(f =>
  statSync(join("./packages", f)).isDirectory()
);

module.exports = {
  extends: ["@commitlint/config-conventional", "./configs/commitlint.types.js"],
  rules: {
    "scope-enum": [
      1,
      "always",
      [...packages, "dependencies", "build", "release", "deps"]
    ]
  }
};
