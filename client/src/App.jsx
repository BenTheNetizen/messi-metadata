import React from "react";
import { base, GlobalStyle } from "./ui";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ThemeProvider theme={base}>
        <GlobalStyle />
        <Routes>
          <Route path="/*" element={<div>app</div>} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
