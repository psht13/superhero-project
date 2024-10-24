import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loader from "./components/Loader";
import DashboardPage from "./pages/DashboardPage";
import HeroDescriptionPage from "./pages/HeroDescriptionPage";
const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />
        <Route
          path="/:heroId"
          element={<HeroDescriptionPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
