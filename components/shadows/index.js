import React from "react";

import { shadow as tokens } from "@washingtonpost/shadow-tokens/dist/tokens";

const BoxShadows = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <style
        dangerouslySetInnerHTML={{
          __html: `.docblock-source {
                    margin-top: 8px;
                    width: 160px;
                    height: 60px;
                }`
        }}
      />
      {Object.keys(tokens).map((token, index) => {
        return (
          <div key={index} className="flex ma-sm">
            <div
              className={`bg-white ml-sm shadow-${index + 1}`}
              style={{
                width: 120,
                height: 120
              }}
            />
            <div className="ml-sm">
              <div className="mt-xs font-xs bold">{tokens[token].comment}</div>
              <code className="font-xxs">{tokens[token].value}</code>
              <code>{`shadow-${index + 1}`}</code>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoxShadows;
