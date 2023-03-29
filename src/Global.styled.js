import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }
  
 ul{
  list-style: none;
  }
  
  img {
   height: auto;
   max-width: 100%;
   display: block;
  }
  
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
