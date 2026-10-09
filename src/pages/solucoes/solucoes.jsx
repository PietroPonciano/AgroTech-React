import { Link, useLocation } from "react-router"

import {
    ChartNoAxesCombined,
    Leaf,
    Sprout,
    Sun
} from "lucide-react"

import SolucaoCard from "../../components/solucaoCard/SolucaoCard"

import SolucaoCard1 from "../../assets/imgs/solucao-card-1.png"
import SolucaoCard2 from "../../assets/imgs/solucao-card-2.png"
import SolucaoCard3 from "../../assets/imgs/solucao-card-3.png"
import SolucaoCard4 from "../../assets/imgs/solucao-card-4.png"

import "./solucoes.styles.css"


// ==============================
// FUNÇÕES AUXILIARES
// ==============================

function carregarResultadoConsultor() {
    const resultadoSalvo = localStorage.getItem("consultorAgroTechResultado")

    if (!resultadoSalvo) {
        return null
    }

    try {
        return JSON.parse(resultadoSalvo)
    } catch {
        return null
    }
}


// ==============================
// COMPONENTE
// ==============================

export default function Solucoes() {

    const location = useLocation()

    // Recupera o diagnóstico realizado pelo Consultor AgroTech
    const resultadoConsultor =
        location.state?.resultadoConsultor ??
        carregarResultadoConsultor()


    return (
        <div className="solucoes__container">

            {/* ==============================
                INTRODUÇÃO
            ================================= */}

            <section className="solucoes__intro">
                <h1 className="solucoes__intro__title">
                    Principais Funcionalidades
                </h1>

                <p className="solucoes__intro__description">
                    Tecnologia e inteligência para transformar o campo e facilitar a
                    gestão agrícola do pequeno produtor.
                </p>
            </section>


            {/* ==============================
                CARDS DE SOLUÇÕES
            ================================= */}

            <section className="solucoes__cards">

                <SolucaoCard
                    imagem={SolucaoCard1}
                    icone={Sprout}
                    titulo="Plantio Inteligente"
                    destaque="Pare de plantar no escuro."
                    descricao="Ajudamos você a escolher o melhor momento e a melhor estratégia de plantio, usando dados para aumentar sua produtividade no campo."
                    solucao="plantio"
                    resultado={resultadoConsultor}
                />

                <SolucaoCard
                    imagem={SolucaoCard2}
                    icone={Sun}
                    titulo="Monitoramento Climático"
                    destaque="Não deixe o clima pegar você de surpresa."
                    descricao="Acompanhe mudanças climáticas importantes e tome decisões mais seguras antes que o prejuízo aconteça."
                    solucao="clima"
                    resultado={resultadoConsultor}
                />

                <SolucaoCard
                    imagem={SolucaoCard3}
                    icone={ChartNoAxesCombined}
                    titulo="Gestão da Produção"
                    destaque="Tenha mais controle da sua produção."
                    descricao="Organize as etapas do plantio, acompanhe o progresso e evite perder informações importantes da sua propriedade."
                    solucao="gestao"
                    resultado={resultadoConsultor}
                />

                <SolucaoCard
                    imagem={SolucaoCard4}
                    icone={Leaf}
                    titulo="Recomendações Sustentáveis"
                    destaque="Produza mais gastando menos recursos."
                    descricao="Receba orientações simples para reduzir desperdícios, cuidar do solo e tornar sua produção mais eficiente."
                    solucao="sustentabilidade"
                    resultado={resultadoConsultor}
                />

            </section>


            <section className="solucoes__cta">
                <div>
                    <span className="solucoes__cta-label">
                        Gestão da Produção
                    </span>

                    <h2>
                        Organize e acompanhe sua produção
                    </h2>

                    <p>
                        Use o Minha Safra para planejar suas produções,
                        acompanhar sua rotina no campo e aproveitar ferramentas
                        simples de planejamento.
                    </p>
                </div>

                <Link to="/minha-safra" className="solucoes__cta-link">
                    <span>Acessar Minha Safra</span>
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
            </section>

        </div>
    )
}
