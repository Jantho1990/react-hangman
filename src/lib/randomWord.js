import { randomInt } from '../helpers'

export const createRandomWord = (wordList) => {
  return wordList[randomInt(wordList.length - 1)]
}