
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { TasksProvider } from "./contexts/TasksContext";

export function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
          <TasksProvider>
            
            <Router />

          </TasksProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
