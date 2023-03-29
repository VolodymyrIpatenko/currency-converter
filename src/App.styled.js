import styled from 'styled-components';

export const MainSection = styled.main`
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 50px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

export const CurrenciesContainer = styled.section`
  display: grid;
  gap: 50px;
  @media screen and (min-width: 1199px) {
    display: flex;
    align-items: center;
    gap: 50px;
  }
`;

export const Input = styled.input`
  padding: 7px;
  font-size: 20px;
  outline: none;
  color: forestgreen;
  border: none;
  &:focus {
    box-shadow: 0 0 3px currentColor;
  }
`;

export const ResultContainer = styled.section`
  font-size: 23px;
  color: forestgreen;
`;

export const ConvertBtn = styled.button`
  display: grid;
  place-content: center;
  width: 100px;
  height: 30px;
  border: none;
  border: 2px solid currentColor;
  font-weight: bold;
  color: currentColor;
  background-color: rgb(226, 252, 184);
  cursor: pointer;
`;

