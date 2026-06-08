import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import AlgorithmPage from "../pages/AlgorithmPage";
import ComparisonPage from "../pages/ComparisonPage";

function Router() {
  return (
    <Routes>
      <Route
        element={
          <MainLayout />
        }
      >
        <Route
          path="/"
          element={
            <HomePage />
          }
        />

        <Route
          path="/algorithm/:slug"
          element={
            <AlgorithmPage />
          }
        />

        <Route
          path="/comparison"
          element={
            <ComparisonPage />
          }
        />
      </Route>
    </Routes>
  );
}

export default Router;