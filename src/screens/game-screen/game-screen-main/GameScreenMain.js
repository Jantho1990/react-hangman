import styled from 'styled-components'

export default styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 3fr 3fr;
  grid-template-rows: 10vh 45vh 45vh;
  grid-template-areas:
    "header"
    "center"
    "footer";
  background-color: ${({ theme }) => theme.gameScreen.backgroundColor};
  color: ${({ theme }) => theme.gameScreen.fontColor};
  @media screen and (min-width: 568px) {
    grid-template-columns: 1fr 1fr;
    grid-template-columns: 60vw 40vw;
    grid-template-rows: 1fr 4fr;
    grid-template-rows: 20vh 80vh;
    grid-template-areas:
      "header header"
      "center footer";
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 3fr 3fr;
    grid-template-rows: 10vh 45vh 45vh;
    grid-template-areas:
      "header"
      "center"
      "footer";
  }
`