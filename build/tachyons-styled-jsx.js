/**
 * let's build a stylesheet for styled-jsx
 *
 * https://github.com/vercel/styled-jsx#external-styles
 */

const fs = require("fs");
const path = require("path");

function build() {
  fs.readFile(path.resolve(process.cwd(), "./css/index.css"), (error, css) => {
    if (error) console.log(error);
    const stylesheetString = css
      .toString()
      .replace("/*# sourceMappingURL=amp.css.map */", "");

    fs.writeFile(
      path.resolve(__dirname, "../css/styled-jsx.js"),
      `/** generated from tachyons-styled-jsx.js */
import css from 'styled-jsx/css';
export const body = css.global\`${stylesheetString}\`;
      `,
      () => {
        console.log("Tachyons build complete: css/styled-jsx.js");
      }
    );
  });
}

build();
