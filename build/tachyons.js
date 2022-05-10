const fs = require("fs");
const path = require("path");

const {
  shadow: tokens
} = require("@washingtonpost/shadow-tokens/dist/tokens.json");

/**
 * Generate Shadow Classes from Shadow Tokens
 */
function generateShadowClasses() {
  const classNames = [];
  Object.keys(tokens).forEach((boop, index) => {
    const { name, comment } = tokens[boop];

    classNames.push(`
      /** ${comment} */
      .shadow-${index + 1} {
            box-shadow: var(--${name});
        }`);
  });

  fs.writeFile(
    path.resolve(__dirname, "../../css/src/box-shadows.css"),
    `/* prettier-ignore */
    /* Autogenerated by build/tachyons.js */

${classNames.join("\n\r\n")}`,
    () => true
  );
}

generateShadowClasses();

const colorTokens = require("@washingtonpost/color-tokens/dist/tokens.json");

/**
 * Generate Color Classes from Color Tokens
 */

let colorNames = [];
const normalizedColors = [];
const { color } = colorTokens;

function generateColorClasses() {
  const colorKeys = Object.keys(color);
  colorKeys.forEach(colorItem => {
    const subColorKeys = Object.keys(color[colorItem]);
    subColorKeys.forEach(subColorItem => {
      if (color[colorItem][subColorItem].name) {
        const thisColorItem = color[colorItem][subColorItem];

        if (
          color[colorItem][subColorItem].name &&
          color[colorItem][subColorItem].name.includes("corporate")
        ) {
          // do nothing
        } else {
          normalizedColors.push({
            ...thisColorItem
          });
        }
      } else {
        Object.keys(color[colorItem][subColorItem]).forEach(
          anotherColorItem => {
            if (
              color[colorItem][subColorItem][anotherColorItem].name &&
              color[colorItem][subColorItem][anotherColorItem].name.includes(
                "corporate"
              )
            ) {
              // do nothing
            } else {
              normalizedColors.push({
                ...color[colorItem][subColorItem][anotherColorItem]
              });
            }
          }
        );
      }
    });
  });

  normalizedColors.forEach(colorItem => {
    const {
      value,
      attributes: { item, subitem, type },
      name: tokenName,
      comment
    } = colorItem;

    const cssComment = comment ? `/* ${comment} */` : "";

    const className =
      subitem === "normal" || typeof subitem === "undefined"
        ? item
        : `${item}${subitem === "base" ? "" : `-${subitem}`}`;
    const isSubs = type === "subscription" ? ".subs-theme" : "";

    const classes = {
      bg: `${cssComment}
${isSubs}.bg-${className} {
  background-color: ${value};
}`,
      color: `${isSubs}.${className} {
  color: ${value};
}`,
      bc: `${isSubs}.bc-${className} {
  border-color: ${value};
}`,
      fill: `${isSubs}.fill-${className} {
  fill: ${value};
}`,
      hoverFill: `${isSubs}.hover-fill-${className}:hover {
  fill: ${value};
}`,
      hover: `${isSubs}.hover-${className}:hover {
  color: ${value};
}`,
      hoverbackgroundColor: `${isSubs}.hover-bg-${className}:hover {
  background-color: ${value};
}`,
      focusBackgroundColor: `${isSubs}.focus-bg-${className}:focus {
  background-color: ${value};
}`,
      focusBorderColor: `${isSubs}.focus-bc-${className}:focus {
  border-color: ${value};
}`
    };

    colorNames = [...colorNames, ...Object.values(classes)];
  });

  const skins = colorNames.join("\n\r\n");

  fs.writeFile(
    path.resolve(__dirname, "../src/css/colors.css"),
    `/* prettier-ignore */
/* Autogenerated by build/tachyons.js */

${skins}`,
    () => true
  );
}

generateColorClasses();
