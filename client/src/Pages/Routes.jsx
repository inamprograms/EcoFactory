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
          <Route path="/esg-guidlines" element={<ESGGuidelineChecker />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default CustomRoutes;
