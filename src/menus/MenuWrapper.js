import styled from 'styled-components'

export default styled.div`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 40rem;
  }
`