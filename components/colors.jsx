import data from "./search/search-data";

export default function ColorTable() {
  return (
    <div className="flex flex-column">
      {data
        .filter(
          i =>
            i.selector.includes("bg-") &&
            !i.selector.includes("hover-") &&
            !i.selector.includes("focus-") &&
            !i.selector.includes("unstable") &&
            !i.selector.includes("clip-") &&
            !i.selector.includes("success-") &&
            !i.selector.includes("right") &&
            !i.selector.includes("transparent") &&
            !i.selector.includes("alpha") &&
            !i.selector.includes("no-repeat")
        )
        .map(i => {
          return (
            <>
              <div>
                <span className="bold font-xs">
                  {i.className.replace("bg-", "").replace("focus-", "")}
                </span>
                <span className="italic font-xxxs"> {i.css[0].value}</span>
              </div>
              <div
                className={`${i.className} w-100 h-xl mb-sm b bc-gray brad-4`}
              ></div>
            </>
          );
        })}
    </div>
  );
}
