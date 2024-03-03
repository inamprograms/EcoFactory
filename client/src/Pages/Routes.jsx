import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./NoPage";
import LandingPage from "./landingPage/LandingPage";

function CustomRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomRoutes;
