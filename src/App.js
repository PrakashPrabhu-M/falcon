// Router
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Local
import Header from "./Pages/Shared/Header/Header";
import LandingPage from "./Pages/Landing Page/LandingPage";
import Result from "./Pages/Result/Result";

export const API = {
  planets: "https://findfalcone.herokuapp.com/planets",
  vehicles: "https://findfalcone.herokuapp.com/vehicles",
  token: "https://findfalcone.herokuapp.com/token",
  find: "https://findfalcone.herokuapp.com/find",
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="" element={<LandingPage />} />
            <Route path="result" element={<Result />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Falcone or anyone can't be found in here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
