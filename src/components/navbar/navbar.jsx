import { useRef } from "react"
import { NavLink } from "react-router"
import "./navbar.styles.css"

export default function Navbar(){

    const botaoMenuRef = useRef(null)
    const menuRef = useRef(null)

    const definirPaginaAtiva = ({ isActive }) => {
        return isActive
            ? "page page-active text-nowrap"
            : "page text-nowrap";
    };

    // Fecha o menu mobile ao navegar, para ele não cobrir o conteúdo da nova página
    const fecharMenu = () => {
        if (menuRef.current?.classList.contains("show")) {
            botaoMenuRef.current?.click();
        }
    };

    return(
            <header>
                <nav className="navbar navbar-expand-xl">

                    <div className="container-fluid navbar-container">

                        <div className="nav-logo mb-0">
                            <img className="nav-logo-icon" src="/favicon.svg" alt="" aria-hidden="true"/>
                            <span className="nav-logo-text"><span className="nav-logo-agro">Agro</span><span
                                className="nav-logo-tech">Tech</span></span>
                        </div>

                        <button ref={botaoMenuRef} className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#paginas" aria-controls="paginas" aria-expanded="false"
                                aria-label="Abrir menu">
                            <i className="bi bi-list"></i>
                        </button>

                        <div ref={menuRef} id="paginas" className="collapse navbar-collapse justify-content-end">
                            <ul className="d-flex flex-column flex-xl-row gap-3 gap-xxl-4 list-unstyled mb-0 align-items-center mt-4 mt-xl-0 pb-2 pb-xl-0">

                                <li>
                                    <NavLink to="/" end className={definirPaginaAtiva} onClick={fecharMenu}>
                                        Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/solucoes" className={definirPaginaAtiva} onClick={fecharMenu}>
                                        Soluções
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/minha-safra" className={definirPaginaAtiva} onClick={fecharMenu}>
                                        Minha Safra
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/quem-somos" className={definirPaginaAtiva} onClick={fecharMenu}>
                                        Quem Somos
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dicas" className={definirPaginaAtiva} onClick={fecharMenu}>
                                        Dicas
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/fale-conosco" className={definirPaginaAtiva} onClick={fecharMenu}>
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
