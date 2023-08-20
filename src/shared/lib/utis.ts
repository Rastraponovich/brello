/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @return {string} The capitalized string.
 */
export function capitalize(str: string): string {
  const firstChar = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1);

  return `${firstChar}${restOfString}`;
}

// /**
//  * дан массив натуральных чисел написать функцию которая вернет минимальную разницу из k выбраных чисел
//  * какая сложность алгоритма по времени и памяти
//  * по умолчанию вернем 0;
//  */

// const minMax(k, arr) {
//   // todo

//   return 0;
// }

// console.log(minMax(3, [10, 100, 200, 1000, 800, 20, 30])); // 20
