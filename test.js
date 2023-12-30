// function minMax(k, arr) {
//   let result = undefined;
//   let start = 0;
//   let end = start + k - 1;
//   arr.sort((a, b) => a - b);
//   while (start < arr.length && end < arr.length) {
//     let sub = arr[end] - arr[start];
//     if (result === undefined) {
//       result = sub;
//     }
//     if (result !== undefined && result > sub) {
//       result = sub;
//     }
//     start += 1;
//     end += 1;
//   }
//   return result;
// }
// console.log(minMax(3, [10, 100, 200, 1000, 800, 20, 30]));
import { Store, combine } from "effector";

export function xor(...stores) {
  return combine(stores, (values) => {
    const first = values[0];

    for (let i = 1; i < values.length; i++) {
      if (values[i] !== first) {
        return true;
      }
    }
    return false;
  });
}

// const booleans = [true, false, true, true, false];
const result = (arr) => {
  const first = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== first) {
      return true;
    }
  }

  return false;
};

// console.log(result(booleans));
console.log(result([true, true, true]), "all true");
console.log(result([true, true, false]), "mix");
console.log(result([false, false, false]), "all false");
console.log(result([]), "empty");
