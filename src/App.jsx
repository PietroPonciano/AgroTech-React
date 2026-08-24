import { Routes, Route } from "react-router";

// layout das paginas
import MainLayout from "./components/layouts/MainLayout";

// paginas
import Home from "./pages/Home/Home";
import Solucoes from "./pages/Solucoes/Solucoes";
import QuemSomos from "./pages/QuemSomos/QuemSomos";
import FaleConosco from "./pages/FaleConosco/FaleConosco";


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
      </Route>
    </Routes>
  );
}