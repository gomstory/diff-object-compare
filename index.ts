import * as _ from "lodash";

function isPrimEmpty(value: string | boolean | number) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

function difference(object = {}, base = {}) {
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (_.isEmpty(result)) {
        result["diff"] = false;
        result["original"] = base;
        result["attributes"] = [];
      }

      const isBothEmpty = isPrimEmpty(value) && isPrimEmpty(base[key]);
      const isEqual = _.isEqual(value, base[key]);

      if (!isBothEmpty && !isEqual) {
        result["diff"] = true;
        result["attributes"].push(key);
      }
    });
  }
  return changes(object, base);
}

const base = {
  a: 1234,
  b: "hoho"
};

const b = {
  a: 1235,
  b: "haha"
};

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById("app");
appDiv.innerHTML = JSON.stringify(difference(base, b));
