import { useState } from "react"

import {
    calcularProducao,
    culturas,
    formatarNumero,
    formatarPeso,
    opcoesCulturas
} from "../../data/culturas"

import "./calculadoraProducao.styles.css"


export default function CalculadoraProducao({
    mostrarBotaoPlanejar = false,
    onPlanejarProducao
}) {

    const [cultura, setCultura] = useState("milho")
    const [area, setArea] = useState(2)

    const culturaSelecionada = culturas[cultura]
    const areaNumerica = Number(area)
    const producao = calcularProducao(cultura, areaNumerica)

    function planejarProducao() {
        if (onPlanejarProducao) {
            onPlanejarProducao({
                cultura,
                culturaNome: culturaSelecionada.nome,
                area: areaNumerica,
                producao
            })
        }
    }

    return (
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
                            {opcoesCulturas.map((opcao) => (
                                <option key={opcao.valor} value={opcao.valor}>
                                    {opcao.nome}
                                </option>
                            ))}
                        </select>
                    </div>


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

                    {mostrarBotaoPlanejar && (
                        <button
                            className="simulador-planejar"
                            type="button"
                            data-cultura={cultura}
                            data-area={area}
                            onClick={planejarProducao}
                        >
                            Planejar esta produção
                        </button>
                    )}

                </div>


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
    )
}
