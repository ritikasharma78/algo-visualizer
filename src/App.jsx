import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="/home" element={<HomePage />} />


    </Routes>
    </BrowserRouter>
    
  );
}

