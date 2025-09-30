import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import ArrayPage from "./pages/array";
import Sorting from "./pages/sorting";
import Dijkstra from "./pages/dijkstra";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arrays" element={<ArrayPage />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/dijkstra" element={<Dijkstra />} />
      </Routes>
    </BrowserRouter>
  );
}
