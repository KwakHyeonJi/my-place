import { ThemeProvider } from 'styled-components';

import Main from '@components/Main';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  );
};
export default App;
