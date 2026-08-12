import { Routes, Route } from "react-router";

import Teste from "./pages/teste";
import Teste2 from "./pages/teste2";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Teste/>} />
      <Route path="/Teste2" element={<Teste2 />} />
    </Routes>
  );
}