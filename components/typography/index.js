import React, { Fragment } from "react";
import typography from "./data";
import { typography as tokens } from "@washingtonpost/typography-tokens/dist/jss/tokens.json";

function toTitleCase(str) {
  if (str === "line-heights") {
    return str.replace(/\w\S*/g, function process(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return str
      .split("-")
      .map(function process(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
      })
      .join(" ");
  }
}

const TypographyHeader = () => {
  return (
    <div className="w-min center mb-md">
      <h1 className="font--headline font-xl pb-sm">Typography</h1>
      <h2 className="font-xxs font-light font-subhead">
        One of the core foundations of our system is our type styles.
      </h2>
    </div>
  );
};

const TypographyTable = props => {
  let isLineHeight = false;

  if (props.name === "line-heights") {
    isLineHeight = true;
  }

  return (
    <>
      <div className="mb-md">
        {isLineHeight ? <hr className="mt-xxl" /> : null}
        <h2 className={`font-md ${isLineHeight ? "font--headline" : ""}`}>
          {toTitleCase(props.name)}
        </h2>
        <p
          className={`font-light font-subhead font-xxxs ${
            !isLineHeight ? "gray-dark" : "subs-theme pink-dark"
          }`}
        >
          {props.values.subtitle}
        </p>
      </div>
      <table className="table-auto mb-lg">
        <thead className="">
          <tr>
            <th className={`font-light font-xxxs gray-dark left`}>
              {!isLineHeight ? "Size" : "Name"}
            </th>
            <th className={`font-light font-xxxs gray-dark left`}>
              {"Pixel Size"}
            </th>
            <th className={`font-light font-xxxs gray-dark left`}>
              {"REM Size"}
            </th>
            <th className={`font-light font-xxxs gray-dark left`}>
              {!isLineHeight ? "Weight" : "Value"}
            </th>
            {!isLineHeight ? (
              <th className={`font-light font-xxxs gray-dark left`}>
                Font-Family
              </th>
            ) : null}
            <th className={`font-light font-xxxs gray-dark left`}>Example</th>
            <th className={`font-light font-xxxs gray-dark left`}>CSS</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.values)
            .slice(1)
            .map(([name, data]) => {
              return (
                <tr key={JSON.stringify(data)} className="">
                  <td>{toTitleCase(name)}</td>
                  {!!data["pixelSize"] ? (
                    <td>{data["pixelSize"]}px</td>
                  ) : (
                    <td>-</td>
                  )}
                  {
                    <td>
                      {data["remSize"] === "undefined" ? "-" : data["remSize"]}
                    </td>
                  }
                  <td>{!isLineHeight ? data["weight"] : data["value"]}</td>
                  {!isLineHeight ? <td>{data["font-family"]}</td> : null}
                  <td className={`${data["css"]} mw-420`}>{data["example"]}</td>
                  <td className="">{data["css"]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export const Typography = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <Fragment>
    <TypographyHeader />
    {Object.entries(typography).map(([key, value]) => {
      Object.entries(value).map(customizeValue => {
        const [name, data] = customizeValue;
        const fontSize = customizeValue[1]?.css
          ?.split("font-")[1]
          .replace(/" "/g, "")
          .trim();
        if (typeof data === "object") {
          data.remSize = String(tokens.size[fontSize]) || "-";
          data.pixelSize = String(data.remSize).replace("rem", "") * 16;
        }

        return [name, data];
      });
      return <TypographyTable key={key} name={key} values={value} />;
    })}
  </Fragment>
);
