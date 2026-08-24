import { Outlet } from "react-router";

// componentes
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Consultor from "../consultor/Consultor"

import "./MainLayout.styles.css";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Consultor />
      
      <Footer />
    </div>
  );
}