import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import debounce from "lodash.debounce";
import Fuse from "fuse.js";
import list from "./search-data";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const CodeExample = ({ code }) => (
  <Highlight {...defaultProps} theme={theme} code={code.trim()} language="css">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={"overflow-xscroll font-xxs" + className}
        style={{
          ...style,
          width: "100%"
        }}
      >
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

const fuse = new Fuse(list, {
  isCaseSensitive: false,
  threshold: 0.3,
  distance: 1000,
  findAllMatches: true,
  minMatchCharLength: 3,
  includeMatches: true,
  keys: [
    "css.prop",
    "css.value",
    "selector",
    "className",
    "responsive",
    "id",
    "src"
  ]
});

const Form = ({ onFormSubmit }) => {
  const [query, setQuery] = useState("line height");
  const delayedQuery = debounce(q => {
    if (q.length > 0) {
      onFormSubmit(fuse.search(q));
    }
  }, 400);

  const handleInput = value => {
    setQuery(value);
  };

  const handleSubmit = () => {
    if (query.length > 0) {
      delayedQuery(query);
    }
  };

  useEffect(() => {
    onFormSubmit(fuse.search("line height"));
  }, []);

  return (
    <form
      className="flex flex-row items-center mb-sm w-100"
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <input
        id="tachyons-search-query"
        name="tachyons-search-query"
        type="search"
        label="Search for Tachyons"
        aria-label="search"
        onChange={event => {
          handleInput(event.target.value);
        }}
        className="text-input b pa-xs mr-sm"
        placeholder="Search for Tachyons"
      />
      <button type="submit" className="b pa-xs pr-sm pl-sm bold white" style={{
        backgroundColor: "var(--wpds-colors-primary)"
      }}>
        Search
      </button>
    </form>
  );
};

export function TachyonsSearch() {
  const [searching, setSearching] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  const onFormSubmit = results => {
    setSearching(true);
    setFilteredList(results);
    setSearching(false);
  };

  return (
    <div>
      <Form onFormSubmit={onFormSubmit} />
      {searching && (
        <div className="ma-lg font--subhead">Searching for Tachyons</div>
      )}
      {!searching && filteredList.length > 0 && (
        <InfiniteLoader
          isItemLoaded={index => index < filteredList.length}
          itemCount={1000}
          loadMoreItems={(startIndex, stopIndex) => {
            return new Promise(resolve =>
              setTimeout(() => {
                if (filteredList.length === 0) {
                  resolve();
                }

                for (let index = startIndex; index <= stopIndex; index++) {
                  // filteredList[index].item = filteredList[index].item;
                }

                resolve();
              }, 0)
            );
          }}
        >
          {({ onItemsRendered, ref }) => (
            <List
              height={1000}
              itemCount={filteredList.length}
              itemSize={150}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={768}
              className="overflow-yscroll"
            >
              {({ index, style }) => {
                const item = filteredList[index].item;

                if (!item) {
                  return (
                    <div
                      className="flex flex-row relative overflow-hidden"
                      style={{
                        ...style,
                        height: style.height - 20,
                        top: style.top + 20
                      }}
                      key={`${JSON.stringify(item)}-${index}`}
                    >
                      Loading, sir
                    </div>
                  );
                }

                return (
                  <div
                    className="flex flex-row relative overflow-hidden w-100 pb-sm overflow-xscroll overflow-yscroll"
                    style={{
                      ...style,
                      height: 200 - 20
                    }}
                    key={`${JSON.stringify(item)}-${index}`}
                  >
                    {/* <pre className="w-100 mr-xs pa-sm ma-0">
                      <code className="language-html">
                        {item && item.className}
                      </code>
                    </pre> */}

                    <CodeExample
                      code={`${item && item.selector} {/* ${
                        item.responsive
                      } */${
                        item.css &&
                        item.css
                          .map(cssItem => {
                            return `\n  ${cssItem.prop}: ${cssItem.value};`;
                          })
                          .join("")
                      }\n}`.trim()}
                    />
                    {/* <div
                      className={`absolute bottom-0 pt-xl pa-lg w-33 overflow-hidden ${
                        item && item.className
                      }`}
                    >
                      Democracy Dies in Darkness
                    </div> */}
                  </div>
                );
              }}
            </List>
          )}
        </InfiniteLoader>
      )}
    </div>
  );
}
