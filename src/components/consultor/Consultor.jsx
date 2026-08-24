import { useState } from "react"
import { useNavigate } from "react-router"

import "./consultor.styles.css"


// ==============================
// DADOS DAS SOLUÇÕES
// ==============================

const solucoes = {
    plantio: {
        titulo: "Plantio Inteligente",
        descricao:
            "Ajuda você a planejar melhor o momento de plantar e tomar decisões com mais segurança."
    },

    clima: {
        titulo: "Monitoramento Climático",
        descricao:
            "Ajuda você a acompanhar mudanças no clima e agir antes que o prejuízo aconteça."
    },

    gestao: {
        titulo: "Gestão da Produção",
        descricao:
            "Ajuda você a organizar informações, etapas e decisões importantes da sua produção."
    },

    sustentabilidade: {
        titulo: "Recomendações Sustentáveis",
        descricao:
            "Ajuda você a reduzir desperdícios e usar melhor os recursos disponíveis no campo."
    }
}


// ==============================
// PERGUNTAS DO DIAGNÓSTICO
// ==============================

const perguntas = [
    {
        texto: "Como você define o melhor momento para plantar?",
        opcoes: [
            {
                texto: "Tenho dificuldade para decidir o melhor momento",
                pontos: { plantio: 3 }
            },
            {
                texto: "Decido pela experiência e observação do campo",
                pontos: { plantio: 2 }
            },
            {
                texto: "Uso previsão, dados ou ferramentas digitais",
                pontos: { plantio: 0 }
            }
        ]
    },

    {
        texto: "Como você acompanha mudanças no clima que podem afetar sua produção?",
        opcoes: [
            {
                texto: "Não acompanho com frequência",
                pontos: { clima: 3 }
            },
            {
                texto: "Acompanho por aplicativos ou previsão comum",
                pontos: { clima: 2 }
            },
            {
                texto: "Uso informações organizadas para tomar decisões",
                pontos: { clima: 0 }
            }
        ]
    },

    {
        texto: "Como você organiza as informações da sua produção?",
        opcoes: [
            {
                texto: "Fica tudo na memória ou em anotações soltas",
                pontos: { gestao: 3 }
            },
            {
                texto: "Uso caderno ou planilha simples",
                pontos: { gestao: 2 }
            },
            {
                texto: "Uso algum sistema ou controle mais organizado",
                pontos: { gestao: 0 }
            }
        ]
    },

    {
        texto: "Como você controla o uso de água, insumos e recursos da produção?",
        opcoes: [
            {
                texto: "Não tenho um controle definido",
                pontos: { sustentabilidade: 3 }
            },
            {
                texto: "Faço controle básico quando percebo necessidade",
                pontos: { sustentabilidade: 2 }
            },
            {
                texto: "Já acompanho e tento reduzir desperdícios",
                pontos: { sustentabilidade: 0 }
            }
        ]
    },

    {
        texto: "O que você gostaria de melhorar primeiro?",
        opcoes: [
            {
                texto: "Aumentar produtividade",
                pontos: { plantio: 2 }
            },
            {
                texto: "Evitar prejuízos com clima",
                pontos: { clima: 2 }
            },
            {
                texto: "Organizar melhor a produção",
                pontos: { gestao: 2 }
            },
            {
                texto: "Reduzir desperdícios",
                pontos: { sustentabilidade: 2 }
            }
        ]
    },

    {
        texto:
            "Depois dessas perguntas, qual você considera seu maior desafio hoje?",
        opcoes: [
            {
                texto: "Planejar o plantio",
                pontos: { plantio: 3 }
            },
            {
                texto: "Lidar com o clima",
                pontos: { clima: 3 }
            },
            {
                texto: "Organizar a produção",
                pontos: { gestao: 3 }
            },
            {
                texto: "Usar melhor os recursos",
                pontos: { sustentabilidade: 3 }
            }
        ]
    }
]


// ==============================
// CONFIGURAÇÕES
// ==============================

const pontuacaoInicial = {
    plantio: 0,
    clima: 0,
    gestao: 0,
    sustentabilidade: 0
}

const CHAVE_RESULTADO = "consultorAgroTechResultado"


// ==============================
// COMPONENTE
// ==============================

export default function Consultor() {

    const navigate = useNavigate()

    // Controle da interface
    const [aberto, setAberto] = useState(false)
    const [etapa, setEtapa] = useState("inicio")

    // Controle do diagnóstico
    const [perguntaAtual, setPerguntaAtual] = useState(0)
    const [pontuacao, setPontuacao] = useState(pontuacaoInicial)
    const [resultado, setResultado] = useState(null)


    // ==============================
    // INICIAR / REINICIAR
    // ==============================

    function iniciarDiagnostico() {
        setPerguntaAtual(0)

        // Cria uma nova cópia para reiniciar os pontos
        setPontuacao({ ...pontuacaoInicial })

        setResultado(null)
        setEtapa("perguntas")
    }


    // ==============================
    // REGISTRAR RESPOSTA
    // ==============================

    function registrarResposta(opcao) {
        const novaPontuacao = { ...pontuacao }

        Object.keys(opcao.pontos).forEach((solucao) => {
            novaPontuacao[solucao] += opcao.pontos[solucao]
        })

        setPontuacao(novaPontuacao)

        // Avança para a próxima pergunta
        if (perguntaAtual < perguntas.length - 1) {
            setPerguntaAtual(perguntaAtual + 1)
            return
        }

        // Última pergunta: calcula e exibe o resultado
        const novoResultado = calcularResultado(novaPontuacao)

        setResultado(novoResultado)
        setEtapa("resultado")
    }


    // ==============================
    // CALCULAR RESULTADO
    // ==============================

    function calcularResultado(pontuacaoFinal) {
        const ranking = Object.keys(pontuacaoFinal)
            .map((chave) => ({
                chave,
                pontos: pontuacaoFinal[chave]
            }))
            .sort((a, b) => b.pontos - a.pontos)

        const principal = ranking[0].chave

        const secundarias = ranking
            .slice(1)
            .filter((item) => item.pontos > 0)
            .slice(0, 2)
            .map((item) => item.chave)

        return {
            principal,
            secundarias
        }
    }


    // ==============================
    // VER SOLUÇÕES INDICADAS
    // ==============================

    function verSolucoesIndicadas() {
        localStorage.setItem(
            CHAVE_RESULTADO,
            JSON.stringify(resultado)
        )

        setAberto(false)

        navigate("/solucoes", {
            state: {
                resultadoConsultor: resultado
            }
        })
    }


    return (
        <section
            className={`consultor ${
                aberto
                    ? "consultor--aberto"
                    : "consultor--chamada-visivel"
            }`}
            aria-label="Consultor AgroTech"
        >

            {/* ==============================
                BOTÃO FLUTUANTE
            ================================= */}

            <button
                className="consultor__botao"
                type="button"
                aria-label="Abrir Consultor AgroTech"
                aria-expanded={aberto}
                onClick={() => setAberto(true)}
            >
                <i
                    className="bi bi-chat-dots-fill"
                    aria-hidden="true"
                ></i>

                <span
                    className="consultor__notificacao"
                    aria-hidden="true"
                ></span>
            </button>


            {/* ==============================
                BALÃO DE CHAMADA
            ================================= */}

            {!aberto && (
                <button
                    className="consultor__chamada"
                    type="button"
                    onClick={() => setAberto(true)}
                >
                    Descubra sua solução ideal
                </button>
            )}


            {/* ==============================
                PAINEL
            ================================= */}

            {aberto && (
                <div
                    className="consultor__painel"
                    aria-hidden={!aberto}
                >

                    {/* Cabeçalho */}
                    <div className="consultor__cabecalho">
                        <div>
                            <span className="consultor__label">
                                Diagnóstico rápido
                            </span>

                            <h2 className="consultor__titulo">
                                Consultor AgroTech
                            </h2>
                        </div>

                        <button
                            className="consultor__fechar"
                            type="button"
                            aria-label="Fechar Consultor AgroTech"
                            onClick={() => setAberto(false)}
                        >
                            <i
                                className="bi bi-x-lg"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>


                    <div className="consultor__conteudo">

                        {/* ==============================
                            ETAPA: INÍCIO
                        ================================= */}

                        {etapa === "inicio" && (
                            <>
                                <div className="consultor__mensagem">
                                    Olá! Eu sou o Consultor AgroTech.
                                    <br />
                                    Responda algumas perguntas rápidas para descobrir
                                    quais soluções combinam mais com sua necessidade
                                    no campo.
                                </div>

                                <div className="consultor__acoes">
                                    <button
                                        className="consultor__acao"
                                        type="button"
                                        onClick={iniciarDiagnostico}
                                    >
                                        Começar diagnóstico
                                    </button>
                                </div>
                            </>
                        )}


                        {/* ==============================
                            ETAPA: PERGUNTAS
                        ================================= */}

                        {etapa === "perguntas" && (
                            <>
                                <p className="consultor__progresso">
                                    Pergunta {perguntaAtual + 1} de{" "}
                                    {perguntas.length}
                                </p>

                                <h3 className="consultor__pergunta">
                                    {perguntas[perguntaAtual].texto}
                                </h3>

                                <div className="consultor__acoes">
                                    {perguntas[perguntaAtual].opcoes.map(
                                        (opcao, indice) => (
                                            <button
                                                key={indice}
                                                className="consultor__resposta"
                                                type="button"
                                                onClick={() =>
                                                    registrarResposta(opcao)
                                                }
                                            >
                                                {opcao.texto}
                                            </button>
                                        )
                                    )}
                                </div>
                            </>
                        )}


                        {/* ==============================
                            ETAPA: RESULTADO
                        ================================= */}

                        {etapa === "resultado" && resultado && (
                            <>
                                <h3 className="consultor__resultado-titulo">
                                    Seu diagnóstico AgroTech
                                </h3>


                                {/* Solução principal */}
                                <div className="consultor__resultado-bloco">
                                    <p className="consultor__resultado-label">
                                        Necessidade principal:
                                    </p>

                                    <p className="consultor__resultado-nome">
                                        {solucoes[resultado.principal].titulo}
                                    </p>

                                    <p className="consultor__resultado-texto">
                                        {
                                            solucoes[resultado.principal]
                                                .descricao
                                        }
                                    </p>
                                </div>


                                {/* Soluções secundárias */}
                                {resultado.secundarias.length > 0 && (
                                    <div className="consultor__resultado-bloco">
                                        <p className="consultor__resultado-label">
                                            Também pode ajudar:
                                        </p>

                                        <ul className="consultor__lista-ajuda">
                                            {resultado.secundarias.map(
                                                (chave) => (
                                                    <li key={chave}>
                                                        {solucoes[chave].titulo}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}


                                {/* Ações finais */}
                                <div className="consultor__acoes">

                                    <button
                                        className="consultor__acao"
                                        type="button"
                                        onClick={verSolucoesIndicadas}
                                    >
                                        Ver soluções indicadas
                                    </button>

                                    <button
                                        className="consultor__acao consultor__acao--secundaria"
                                        type="button"
                                        onClick={iniciarDiagnostico}
                                    >
                                        Refazer diagnóstico
                                    </button>

                                    <button
                                        className="consultor__acao consultor__acao--secundaria"
                                        type="button"
                                        onClick={() => setAberto(false)}
                                    >
                                        Fechar
                                    </button>

                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}

        </section>
    )
}