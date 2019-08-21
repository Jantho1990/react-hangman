import styled from 'styled-components'

export default styled.div`
  grid-area: center;
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 3rem;

  @media screen and (min-width: 568px) {
    margin-bottom: 0;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 3rem;
  }
`
