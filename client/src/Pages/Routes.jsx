import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./NoPage";
import ESGGuidelineChecker from "./esgGuidelineChecker/ESGGuidelineChecker";
import ProductOptimization from "./productOptimization/ProductOptimization";
function CustomRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductOptimization />} />
          <Route path="/ESG_Guideline_Checker" element={<ESGGuidelineChecker />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CustomRoutes;
