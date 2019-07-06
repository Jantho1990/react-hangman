import words from '../assets/words'

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export const randomWord = () => {
  return words[randomInt(words.length - 1)]
}

export default randomWord()