import { useState } from "react"
import { useLocation } from "react-router"

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
// DADOS DA CALCULADORA
// ==============================

const culturas = {
    milho: {
        nome: "Milho",
        produtividade: 5426,
        fonte: "IBGE/PAM 2024"
    },

    feijao: {
        nome: "Feijão",
        produtividade: 1147,
        fonte: "IBGE/PAM 2024"
    },

    tomate: {
        nome: "Tomate",
        produtividade: 72760,
        fonte: "IBGE/PAM 2024"
    },

    alface: {
        nome: "Alface",
        produtividade: 18600,
        fonte: "Embrapa"
    },

    mandioca: {
        nome: "Mandioca",
        produtividade: 15465,
        fonte: "IBGE/PAM 2024"
    }
}


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


function formatarNumero(valor) {
    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 1
    }).format(valor)
}


function formatarPeso(valor) {
    if (valor >= 1000) {
        return `${formatarNumero(valor / 1000)} t`
    }

    return `${formatarNumero(valor)} kg`
}


// ==============================
// COMPONENTE
// ==============================

export default function Solucoes() {

    const location = useLocation()

    // Estados da calculadora
    const [cultura, setCultura] = useState("milho")
    const [area, setArea] = useState(2)

    // Recupera o diagnóstico realizado pelo Consultor AgroTech
    const resultadoConsultor =
        location.state?.resultadoConsultor ??
        carregarResultadoConsultor()

    // Cultura atualmente selecionada no formulário
    const culturaSelecionada = culturas[cultura]

    // Produção = área plantada × produtividade média da cultura
    const producao =
        Number(area) * culturaSelecionada.produtividade


    return (
        <main className="solucoes__container">

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


            {/* ==============================
                CALCULADORA DE PRODUÇÃO
            ================================= */}

            <section
                className="simulador-section"
                aria-labelledby="simulador-title"
            >

                <div className="simulador-texto">
                    <span className="simulador-label">
                        Estimativa rápida
                    </span>

                    <h2 id="simulador-title">
                        Calculadora de Produção
                    </h2>

                    <p>
                        Informe o tamanho do plantio e tenha uma simulação rápida de
                        quanto pode ser colhido.
                    </p>

                    <p className="simulador-fonte">
                        Estimativa com médias reais: IBGE/PAM 2024 e Embrapa.
                    </p>
                </div>


                <form
                    className="simulador-card"
                    onSubmit={(evento) => evento.preventDefault()}
                >

                    <div className="simulador-campos">

                        {/* Cultura */}
                        <div className="simulador-campo">
                            <label htmlFor="simulador-cultura">
                                Cultura
                            </label>

                            <select
                                id="simulador-cultura"
                                value={cultura}
                                onChange={(evento) =>
                                    setCultura(evento.target.value)
                                }
                            >
                                <option value="milho">Milho</option>
                                <option value="feijao">Feijão</option>
                                <option value="tomate">Tomate</option>
                                <option value="alface">Alface</option>
                                <option value="mandioca">Mandioca</option>
                            </select>
                        </div>


                        {/* Área plantada */}
                        <div className="simulador-campo">
                            <label htmlFor="simulador-area">
                                Área plantada (ha)
                            </label>

                            <input
                                id="simulador-area"
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={area}
                                onChange={(evento) =>
                                    setArea(evento.target.value)
                                }
                                inputMode="decimal"
                            />
                        </div>

                    </div>


                    {/* Resultado */}
                    <div
                        className="simulador-resultado"
                        aria-live="polite"
                    >
                        <i
                            className="bi bi-basket2-fill"
                            aria-hidden="true"
                        ></i>

                        <div>
                            <span>
                                Produção estimada
                            </span>

                            <output>
                                {formatarPeso(producao)}
                            </output>

                            <p>
                                {culturaSelecionada.nome}:{" "}
                                {formatarNumero(culturaSelecionada.produtividade)} kg/ha.
                                Fonte: {culturaSelecionada.fonte}.
                            </p>
                        </div>
                    </div>

                </form>

            </section>

        </main>
    )
}