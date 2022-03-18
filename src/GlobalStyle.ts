import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  body {
    font-family: 'Roboto', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color : "black";
    transition: all 0.25s linear;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  

`;

export default GlobalStyle;
