function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export const createRandomWord = (wordList) => {
  return wordList[randomInt(wordList.length - 1)]
}