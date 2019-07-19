/**
 * A polyfill for Object.fromEntries().
 *
 * @param {array} arr An array containing entries, e.g. [key, value].
 *
 * @return {object}
 */
export function objectFromEntries(arr) {
  const obj = {}
  // debugger
  arr.forEach(([key, value]) => obj[key] = value)

  return obj
}

/**
 * Creates a random integer.
 *
 * @param {number} max The maximum allowed value of the randomly generated integer.
 *
 * @return {number} The random integer.
 */
export function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}