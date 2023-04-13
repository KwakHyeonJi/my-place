import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #fafafa;
    font-family: 'Poppins', sans-serif;
    user-select: none;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalStyle;
