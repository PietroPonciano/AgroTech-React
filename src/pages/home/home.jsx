import AgricultorImg from "../../assets/imgs/AgricultorHero.webp"
import { Link } from "react-router"

import "./home.styles.css"

export default function Home(){
    return(
        <>
            <section className="hero-section">
                <div className="row align-items-center justify-content-around gy-5 container-fluid">
                    <div className="col-12 col-lg-6 d-flex flex-column gap-3 text-center">
                        <h1 className="hero-title">AgroTech</h1>
                        <h2 className="hero-subtitle">
                            Tecnologia que cabe na palma da mão do pequeno produtor.
                        </h2>
                        <p className="hero-text">
                            O AgroTech é um assistente agrícola digital feito para pequenos
                            produtores rurais e agricultores familiares. Ajudamos no planejamento
                            de plantio, monitoramento climático e gestão da produção — simples,
                            acessível e pensado para o campo brasileiro.
                        </p>
                        {/* Esse botao so aparece com a tela grande */}
                        <a
                            href="https://www.youtube.com/watch?v=eFqLEcY02dg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-btn align-self-stretch justify-content-center d-none d-lg-flex"
                        >
                            <i className="bi bi-play-circle-fill hero-btn-icon" aria-hidden="true" />
                            <div className="hero-btn-texto">
                                <span className="hero-btn-titulo">Pitch Vídeo</span>
                                <span className="hero-btn-subtitulo">
              Conheça as novas funcionalidades do site
            </span>
                            </div>
                        </a>
                    </div>
                    <div className="col-12 col-lg-5">
                        <img
                            src={AgricultorImg}
                            alt="Agricultor segurando um tablet no campo"
                            className="hero-img w-100"
                        />
                    </div>
                    {/* Esse botao so aparece quando a tela fica pequena */}
                    <div className="col-12 d-flex flex-column d-lg-none">
                        <a
                            href="https://www.youtube.com/watch?v=eFqLEcY02dg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-btn align-self-stretch justify-content-center"
                        >
                            <i className="bi bi-play-circle-fill hero-btn-icon" aria-hidden="true" />
                            <div className="hero-btn-texto">
                                <span className="hero-btn-titulo">Pitch Vídeo</span>
                                <span className="hero-btn-subtitulo">
              Conheça as novas funcionalidades do site
            </span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="problema-section">
                <div className="container-fluid problema-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9 problema-intro">
                            <h2 id="problema-title">Os desafios do pequeno agricultor</h2>
                            <p>
                                A agricultura familiar é essencial para o abastecimento do país, mas
                                muitos produtores ainda precisam decidir quando plantar, colher e
                                vender com pouca informação acessível. Na prática, isso torna cada
                                safra mais exposta ao clima, à falta de planejamento e ao
                                desperdício.
                            </p>
                        </div>
                    </div>
                    <div className="row gy-4 justify-content-center problema-cards">
                        <div className="col-12 col-md-6 col-xl-3 d-flex">
                            <article className="problema-card w-100">
                                <i className="bi bi-graph-down-arrow problema-card-icon" aria-hidden="true" />
                                <h3>Baixa produtividade</h3>
                                <p>
                                    Sem dados simples, o produtor pode plantar na época errada e
                                    perder parte do potencial da terra.
                                </p>
                            </article>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3 d-flex">
                            <article className="problema-card w-100">
                                <i className="bi bi-cloud-lightning-rain problema-card-icon" aria-hidden="true" />
                                <h3>Clima imprevisível</h3>
                                <p>
                                    Secas, chuvas fortes e mudanças bruscas dificultam proteger a
                                    lavoura antes do prejuízo acontecer.
                                </p>
                            </article>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3 d-flex">
                            <article className="problema-card w-100">
                                <i className="bi bi-journal-text problema-card-icon" aria-hidden="true" />
                                <h3>Gestão manual</h3>
                                <p>
                                    Anotações em papel tornam difícil acompanhar gastos, estoque,
                                    vendas e lucro real da produção.
                                </p>
                            </article>
                        </div>
                        <div className="col-12 col-md-6 col-xl-3 d-flex">
                            <article className="problema-card w-100">
                                <i className="bi bi-wifi-off problema-card-icon" aria-hidden="true" />
                                <h3>Acesso limitado</h3>
                                <p>
                                    No campo, a conexão falha e muitas ferramentas digitais são caras
                                    ou complexas para a rotina rural.
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-7 problema-fechamento">
                            <p>
                                É por isso que a AgroTech surgiu, para ajudar o produtor nos
                                problemas que mais impactam o seu dia a dia.
                            </p>
                            <Link to="/solucoes" className="problema-link">
                                <span>Ver soluções</span>
                                <i className="bi bi-arrow-right" aria-hidden="true" />

                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
