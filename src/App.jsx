
import { Routes, Route } from "react-router-dom";


// layout das paginas
import MainLayout from "./components/layouts/MainLayout";

// paginas
import Home from "./pages/home/home";
import Solucoes from "./pages/solucoes/solucoes";
import QuemSomos from "./pages/quemSomos/quemSomos";
import DicasAgricolas from "./pages/dicasAgricolas/DicasAgricolas.jsx";
import FaleConosco from "./pages/faleConosco/faleConosco";


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/dicas" element={<DicasAgricolas />} />
        <Route path="/fale-conosco" element={<FaleConosco />} />
      </Route>
    </Routes>
  );
}