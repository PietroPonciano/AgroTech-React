import { Link } from "react-router"
import "./footer.styles.css"

export default function Footer(){
    return(
        <footer>
            <div className="container-fluid footer-container">

                <div className="row gy-4 gx-4 justify-content-lg-between">

                    <div className="col-12 col-lg footer-agrotech text-center">

                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-agro">Agro</span><span className="footer-logo-tech">Tech</span>
                        </Link>

                        <p className="footer-texto-medio">The Future Is Now</p>

                        <p className="footer-texto-fraco">Tecnologia para o pequeno&nbsp;produtor brasileiro.</p>

                    </div>

                    <div className="col-12 col-lg footer-navegacao-col">
                        <nav aria-label="Links do rodapé"
                             className="footer-navegacao d-flex flex-column align-items-center">
                            <p className="footer-titulo">NAVEGAÇÃO</p>
                            <Link to="/" className="footer-navegacao-pagina footer-texto-fraco">Home</Link>
                            <Link to="/solucoes" className="footer-navegacao-pagina footer-texto-fraco">Soluções</Link>
                            <Link to="/quem-somos" className="footer-navegacao-pagina footer-texto-fraco">Quem Somos</Link>
                            <Link to="/dicas" className="footer-navegacao-pagina footer-texto-fraco">Dicas</Link>
                            <Link to="/fale-conosco" className="footer-navegacao-pagina footer-texto-fraco">Fale
                                Conosco</Link>
                        </nav>
                    </div>

                    <div className="col-12 col-lg footer-pitch text-center">
                        <p className="footer-pitch-titulo footer-titulo mb-3">PITCH VÍDEO</p>

                        <a href="https://www.youtube.com/watch?v=eFqLEcY02dg" target="_blank" rel="noopener noreferrer"
                           className="footer-pitch-link d-flex align-items-center text-decoration-none justify-content-center">
                            <i className="bi bi-play-circle-fill"></i>
                            <div className="d-flex flex-column text-start">
                                <p className="footer-texto-medio mb-1 fw-bold">Assista ao nosso pitch</p>
                                <p className="footer-texto-fraco mb-0">Conheça as novas funcionalidades do site</p>
                            </div>
                        </a>
                    </div>

                    <div className="col-12 col-lg footer-equipe text-center">
                        <p className="footer-titulo mb-3">EQUIPE 1ESOB — FIAP 2026</p>
                        <ul className="list-unstyled footer-texto-fraco">
                            <li className="mb-1">Guilherme Silva Costa — RM573826</li>
                            <li className="mb-1">Matheus Leite Carneiro — RM568733</li>
                            <li className="mb-1">Pedro Corvino Gamba — RM573756</li>
                            <li className="mb-1">Pietro Gonçalves Ponciano — RM570521</li>
                        </ul>
                    </div>

                </div>

                <div className="row border-top mt-3 pt-3">
                    <div className="col-12 text-center">
                        <p className="footer-copyright footer-texto-fraco">© 2026 AgroTech · Projeto acadêmico FIAP —
                            todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>

    )
}
