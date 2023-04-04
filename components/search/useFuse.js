/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const useFuse = (query, list) => {
  const [results, setResults] = useState([]);

  const fuse = new Fuse(list, {
    isCaseSensitive: false,
    threshold: 0.3,
    distance: 1000,
    findAllMatches: true,
    minMatchCharLength: 3,
    includeMatches: true,
    keys: ["css.prop", "css.value", "selector", "className", "responsive"]
  });

  useEffect(() => {
    setResults(fuse.search(query));

    return () => {
      setResults([]);
    };
  }, [query]);

  return results;
};
export default useFuse;
