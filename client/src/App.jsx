import React from "react";
import { base, GlobalStyle } from "./ui";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages";

function App() {
  return (
    <Router>
      <ThemeProvider theme={base}>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
