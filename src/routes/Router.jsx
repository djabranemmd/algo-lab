import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import AlgorithmPage from "../pages/AlgorithmPage";
import ComparisonPage from "../pages/ComparisonPage";
import DashboardPage from "../pages/DashboardPage";
import GraphLabPage from "../pages/GraphLabPage";
import DijkstraPage from "../pages/DijkstraPage";


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
        
        <Route
  path="/graph-lab"
  element={<GraphLabPage />}
        />
        
        <Route
  path="/dijkstra"
  element={
    <DijkstraPage />
  }
/>

        <Route
  path="/dashboard"
  element={<DashboardPage />}
        />
        
      </Route>
    </Routes>
  );
}

export default Router;