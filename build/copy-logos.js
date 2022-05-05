const { resolve } = require("path");
const ncp = require("ncp").ncp;
ncp.limit = 16;

ncp(
  resolve("./../../node_modules/@washingtonpost/logo-tokens/dist/react"),
  "./src/logo/dist",
  function callback(err) {
    if (err) {
      return console.error(err);
    }
    console.log("done!");
    return true;
  }
);
