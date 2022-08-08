import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Model from "./pages/Model/Model";
import Thanks from "./pages/TU/TU";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/model" element={<Model />} />
          <Route exact path="/thankyou" element={<Thanks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
