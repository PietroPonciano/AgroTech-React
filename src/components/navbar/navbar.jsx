import { NavLink } from "react-router"
import "./navbar.styles.css"

export default function Navbar(){

    const definirPaginaAtiva = ({ isActive }) => {
        return isActive
            ? "page page-active text-nowrap"
            : "page text-nowrap";
    };

    return(
            <header>
                <nav className="navbar navbar-expand-lg">

                    <div className="container-fluid navbar-container">

                        <div className="nav-logo mb-0">
                            <img className="nav-logo-icon" src="/favicon.svg" alt="" aria-hidden="true"/>
                            <span className="nav-logo-text"><span className="nav-logo-agro">Agro</span><span
                                className="nav-logo-tech">Tech</span></span>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#paginas" aria-controls="paginas" aria-expanded="false"
                                aria-label="Abrir menu">
                            <i className="bi bi-list"></i>
                        </button>

                        <div id="paginas" className="collapse navbar-collapse justify-content-end">
                            <ul className="d-flex flex-column flex-lg-row gap-4 list-unstyled mb-0 align-items-center mt-5 mt-lg-0">

                                <li>
                                    <NavLink to="/" end className={definirPaginaAtiva}>
                                        Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/solucoes" className={definirPaginaAtiva}>
                                        Soluções
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/quem-somos" className={definirPaginaAtiva}>
                                        Quem Somos
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dicas" className={definirPaginaAtiva}>
                                        Dicas
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/fale-conosco" className={definirPaginaAtiva}>
                                        Fale Conosco
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>
                </nav>
            </header>
    )
}