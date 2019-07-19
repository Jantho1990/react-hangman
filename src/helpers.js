/**
 * A polyfill for Object.fromEntries().
 *
 * @param {array} arr An array containing entries, e.g. [key, value].
 *
 * @return {object}
 */
export function objectFromEntries(arr) {
  const obj = {}
  debugger
  arr.forEach(([key, value]) => obj[key] = value)

  return obj
}