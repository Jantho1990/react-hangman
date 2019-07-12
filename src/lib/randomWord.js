import words from '../assets/word_list_combined'

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export const createRandomWord = () => {
  return words[randomInt(words.length - 1)]
}

export default createRandomWord()