import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-decoration: none;
  outline: none;
  border: none;
  background: none;
}

a:link,
a:visited,
a:hover,
a:active {
  color: inherit;
  text-decoration: none;
}

ol,
ul {
  list-style: none;
}
  
html,
body,
#app,
#root {
  height: 100%;
}

button {
  // IOS下button padding大小不可调整，加上这个专治各种不服。
  -webkit-appearance: none;
}

input[type=password]::-ms-reveal,
input[type=password]::-ms-clear {
  display: none;
}
`;
