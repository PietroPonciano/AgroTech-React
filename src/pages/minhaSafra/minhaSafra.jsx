import { useState } from "react"

import CalculadoraProducao from "../../components/calculadoraProducao/CalculadoraProducao"
import {
    calcularProducao,
    culturas,
    formatarNumero,
    formatarPeso,
    opcoesCulturas
} from "../../data/culturas"

import "./minhaSafra.styles.css"


const CHAVE_SAFRAS = "agrotechSafras"

const formularioInicial = {
    cultura: "milho",
    area: "",
    dataPlantio: ""
}

const formularioAtividadeInicial = {
    titulo: "",
    dataPrevista: ""
}


function carregarSafrasSalvas() {
    const safrasSalvas = localStorage.getItem(CHAVE_SAFRAS)

    if (!safrasSalvas) {
        return []
    }

    try {
        const safras = JSON.parse(safrasSalvas)

        return Array.isArray(safras) ? safras : []
    } catch {
        return []
    }
}


function gerarId() {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`
}


function formatarData(data) {
    if (!data) {
        return ""
    }

    const [ano, mes, dia] = data.split("-")

    return `${dia}/${mes}/${ano}`
}


function formatarArea(area) {
    const areaNumerica = Number(area)
    const unidade = areaNumerica === 1 ? "hectare" : "hectares"

    return `${formatarNumero(areaNumerica)} ${unidade}`
}


function buscarCultura(cultura) {
    return culturas[cultura] ?? {
        nome: cultura
    }
}


function calcularProgresso(safra) {
    const atividades = safra.atividades ?? []
    const total = atividades.length
    const concluidas = atividades.filter((atividade) =>
        atividade.concluida
    ).length
    const percentual = total > 0
        ? Math.round((concluidas / total) * 100)
        : 0

    return {
        concluidas,
        total,
        percentual
    }
}


function TextoAtividades({ progresso }) {
    if (progresso.total === 0) {
        return "Nenhuma atividade cadastrada"
    }

    return `${progresso.concluidas} de ${progresso.total} atividades concluídas`
}


function BarraProgresso({ percentual }) {
    return (
        <div className="minha-safra__barra" aria-hidden="true">
            <span style={{ width: `${percentual}%` }}></span>
        </div>
    )
}


function SafraCard({ safra, onVerSafra }) {
    const cultura = buscarCultura(safra.cultura)
    const producao = calcularProducao(safra.cultura, safra.area)
    const progresso = calcularProgresso(safra)

    return (
        <article className="minha-safra__card">
            <div className="minha-safra__card-topo">
                <div>
                    <h3>
                        {cultura.nome}
                    </h3>

                    <p>
                        {formatarArea(safra.area)}
                    </p>
                </div>

                <span className="minha-safra__status">
                    {safra.status}
                </span>
            </div>

            <p className="minha-safra__plantio">
                Plantio: {formatarData(safra.dataPlantio)}
            </p>

            <div className="minha-safra__estimativa">
                <span>
                    Produção estimada
                </span>

                <strong>
                    {formatarPeso(producao)}
                </strong>
            </div>

            <div className="minha-safra__progresso">
                <div className="minha-safra__progresso-topo">
                    <span>
                        Progresso
                    </span>

                    <strong>
                        {progresso.percentual}%
                    </strong>
                </div>

                <BarraProgresso percentual={progresso.percentual} />

                <p>
                    <TextoAtividades progresso={progresso} />
                </p>
            </div>

            <button
                className="minha-safra__ver"
                type="button"
                onClick={() => onVerSafra(safra.id)}
            >
                Ver Safra
            </button>
        </article>
    )
}


function DetalheSafra({
    safra,
    formularioAtividade,
    formularioAtividadeAberto,
    erroAtividade,
    onAdicionarAtividade,
    onAtualizarAtividade,
    onCancelarAtividade,
    onMostrarFormularioAtividade,
    onVoltar,
    onAlternarAtividade
}) {
    const cultura = buscarCultura(safra.cultura)
    const producao = calcularProducao(safra.cultura, safra.area)
    const progresso = calcularProgresso(safra)
    const atividades = safra.atividades ?? []

    return (
        <main className="minha-safra__container">
            <section className="minha-safra__detalhe">
                <button
                    className="minha-safra__voltar"
                    type="button"
                    onClick={onVoltar}
                >
                    <i className="bi bi-arrow-left" aria-hidden="true"></i>
                    Voltar para Minhas Safras
                </button>

                <div className="minha-safra__detalhe-topo">
                    <div>
                        <span className="minha-safra__label">
                            Acompanhamento
                        </span>

                        <h1>
                            Safra de {cultura.nome}
                        </h1>

                        <p>
                            {formatarArea(safra.area)} · Plantio:{" "}
                            {formatarData(safra.dataPlantio)}
                        </p>
                    </div>

                    <span className="minha-safra__status">
                        {safra.status}
                    </span>
                </div>

                <div className="minha-safra__resumo-detalhe">
                    <div className="minha-safra__estimativa">
                        <span>
                            Produção estimada
                        </span>

                        <strong>
                            {formatarPeso(producao)}
                        </strong>
                    </div>

                    <div className="minha-safra__progresso minha-safra__progresso--detalhe">
                        <div className="minha-safra__progresso-topo">
                            <span>
                                Progresso da Safra
                            </span>

                            <strong>
                                {progresso.percentual}%
                            </strong>
                        </div>

                        <BarraProgresso percentual={progresso.percentual} />

                        <p>
                            <TextoAtividades progresso={progresso} />
                        </p>
                    </div>
                </div>

                <section
                    className="minha-safra__atividades"
                    aria-labelledby="atividades-title"
                >
                    <div className="minha-safra__atividades-topo">
                        <div>
                            <span className="minha-safra__label">
                                Rotina da safra
                            </span>

                            <h2 id="atividades-title">
                                Atividades
                            </h2>
                        </div>

                        <button
                            className="minha-safra__botao"
                            type="button"
                            onClick={onMostrarFormularioAtividade}
                        >
                            Adicionar atividade
                        </button>
                    </div>

                    {formularioAtividadeAberto && (
                        <form
                            className="minha-safra__formulario minha-safra__formulario--atividade"
                            onSubmit={onAdicionarAtividade}
                        >
                            <div className="minha-safra__campos minha-safra__campos--atividade">
                                <div className="minha-safra__campo">
                                    <label htmlFor="atividade-titulo">
                                        Nome da atividade
                                    </label>

                                    <input
                                        id="atividade-titulo"
                                        name="titulo"
                                        type="text"
                                        value={formularioAtividade.titulo}
                                        onChange={onAtualizarAtividade}
                                        placeholder="Ex: Preparar o solo"
                                        required
                                    />
                                </div>

                                <div className="minha-safra__campo">
                                    <label htmlFor="atividade-data">
                                        Data prevista
                                    </label>

                                    <input
                                        id="atividade-data"
                                        name="dataPrevista"
                                        type="date"
                                        value={formularioAtividade.dataPrevista}
                                        onChange={onAtualizarAtividade}
                                        required
                                    />
                                </div>
                            </div>

                            {erroAtividade && (
                                <p
                                    className="minha-safra__erro"
                                    aria-live="polite"
                                >
                                    {erroAtividade}
                                </p>
                            )}

                            <div className="minha-safra__formulario-acoes">
                                <button
                                    className="minha-safra__botao"
                                    type="submit"
                                >
                                    Adicionar
                                </button>

                                <button
                                    className="minha-safra__botao minha-safra__botao--secundario"
                                    type="button"
                                    onClick={onCancelarAtividade}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}

                    {atividades.length === 0 ? (
                        <div className="minha-safra__vazio minha-safra__vazio--atividade">
                            <i
                                className="bi bi-list-check"
                                aria-hidden="true"
                            ></i>

                            <h3>
                                Nenhuma atividade cadastrada.
                            </h3>

                            <p>
                                Adicione as etapas que deseja acompanhar nesta
                                safra.
                            </p>
                        </div>
                    ) : (
                        <div className="minha-safra__atividades-lista">
                            {atividades.map((atividade) => (
                                <article
                                    className={`minha-safra__atividade ${
                                        atividade.concluida
                                            ? "minha-safra__atividade--concluida"
                                            : ""
                                    }`}
                                    key={atividade.id}
                                >
                                    <label className="minha-safra__atividade-check">
                                        <input
                                            type="checkbox"
                                            checked={atividade.concluida}
                                            onChange={() =>
                                                onAlternarAtividade(
                                                    atividade.id
                                                )
                                            }
                                            aria-label={`Concluir atividade: ${atividade.titulo}`}
                                        />

                                        <span aria-hidden="true">
                                            {atividade.concluida ? "☑" : "☐"}
                                        </span>
                                    </label>

                                    <div className="minha-safra__atividade-info">
                                        <h3>
                                            {atividade.titulo}
                                        </h3>

                                        <p>
                                            {formatarData(
                                                atividade.dataPrevista
                                            )}
                                        </p>
                                    </div>

                                    <span className="minha-safra__atividade-status">
                                        {atividade.concluida
                                            ? "Concluída"
                                            : "Pendente"}
                                    </span>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </section>
        </main>
    )
}


export default function MinhaSafra() {

    const [safras, setSafras] = useState(carregarSafrasSalvas)
    const [safraSelecionadaId, setSafraSelecionadaId] = useState(null)
    const [formularioAberto, setFormularioAberto] = useState(false)
    const [formulario, setFormulario] = useState(formularioInicial)
    const [erroFormulario, setErroFormulario] = useState("")
    const [formularioAtividadeAberto, setFormularioAtividadeAberto] =
        useState(false)
    const [formularioAtividade, setFormularioAtividade] = useState(
        formularioAtividadeInicial
    )
    const [erroAtividade, setErroAtividade] = useState("")

    const safraSelecionada = safras.find(
        (safra) => safra.id === safraSelecionadaId
    )


    function salvarSafras(safrasAtualizadas) {
        setSafras(safrasAtualizadas)
        localStorage.setItem(CHAVE_SAFRAS, JSON.stringify(safrasAtualizadas))
    }


    function mostrarFormulario(dadosFormulario) {
        setFormulario(dadosFormulario)
        setErroFormulario("")
        setFormularioAberto(true)

        setTimeout(() => {
            document
                .getElementById("formulario-safra")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
        }, 0)
    }


    function abrirFormulario() {
        mostrarFormulario(formularioInicial)
    }


    function cancelarCadastro() {
        setFormulario(formularioInicial)
        setErroFormulario("")
        setFormularioAberto(false)
    }


    function atualizarCampoFormulario(evento) {
        const { name, value } = evento.target

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            [name]: value
        }))
    }


    function validarFormulario() {
        if (!formulario.cultura) {
            return "Selecione uma cultura."
        }

        if (!formulario.area || Number(formulario.area) <= 0) {
            return "Informe uma área plantada maior que zero."
        }

        if (!formulario.dataPlantio) {
            return "Informe a data do plantio."
        }

        return ""
    }


    function cadastrarSafra(evento) {
        evento.preventDefault()

        const erro = validarFormulario()

        if (erro) {
            setErroFormulario(erro)
            return
        }

        const novaSafra = {
            id: gerarId(),
            cultura: formulario.cultura,
            area: Number(formulario.area),
            dataPlantio: formulario.dataPlantio,
            status: "Em andamento",
            atividades: []
        }

        salvarSafras([novaSafra, ...safras])

        setFormulario(formularioInicial)
        setErroFormulario("")
        setFormularioAberto(false)
    }


    function prepararProducao(dadosProducao) {
        mostrarFormulario({
            cultura: dadosProducao.cultura,
            area: dadosProducao.area || "",
            dataPlantio: ""
        })
    }


    function verSafra(safraId) {
        setSafraSelecionadaId(safraId)
        setFormularioAtividadeAberto(false)
        setFormularioAtividade(formularioAtividadeInicial)
        setErroAtividade("")

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    function voltarParaLista() {
        setSafraSelecionadaId(null)
        setFormularioAtividadeAberto(false)
        setFormularioAtividade(formularioAtividadeInicial)
        setErroAtividade("")
    }


    function mostrarFormularioAtividade() {
        setFormularioAtividade(formularioAtividadeInicial)
        setErroAtividade("")
        setFormularioAtividadeAberto(true)
    }


    function cancelarAtividade() {
        setFormularioAtividade(formularioAtividadeInicial)
        setErroAtividade("")
        setFormularioAtividadeAberto(false)
    }


    function atualizarFormularioAtividade(evento) {
        const { name, value } = evento.target

        setFormularioAtividade((dadosAtuais) => ({
            ...dadosAtuais,
            [name]: value
        }))
    }


    function validarAtividade() {
        if (!formularioAtividade.titulo.trim()) {
            return "Informe o nome da atividade."
        }

        if (!formularioAtividade.dataPrevista) {
            return "Informe a data prevista."
        }

        return ""
    }


    function adicionarAtividade(evento) {
        evento.preventDefault()

        const erro = validarAtividade()

        if (erro) {
            setErroAtividade(erro)
            return
        }

        const novaAtividade = {
            id: gerarId(),
            titulo: formularioAtividade.titulo.trim(),
            dataPrevista: formularioAtividade.dataPrevista,
            concluida: false
        }

        const safrasAtualizadas = safras.map((safra) => {
            if (safra.id !== safraSelecionadaId) {
                return safra
            }

            return {
                ...safra,
                atividades: [
                    ...(safra.atividades ?? []),
                    novaAtividade
                ]
            }
        })

        salvarSafras(safrasAtualizadas)
        setFormularioAtividade(formularioAtividadeInicial)
        setErroAtividade("")
        setFormularioAtividadeAberto(false)
    }


    function alternarAtividade(atividadeId) {
        const safrasAtualizadas = safras.map((safra) => {
            if (safra.id !== safraSelecionadaId) {
                return safra
            }

            return {
                ...safra,
                atividades: (safra.atividades ?? []).map((atividade) => {
                    if (atividade.id !== atividadeId) {
                        return atividade
                    }

                    return {
                        ...atividade,
                        concluida: !atividade.concluida
                    }
                })
            }
        })

        salvarSafras(safrasAtualizadas)
    }


    if (safraSelecionada) {
        return (
            <DetalheSafra
                safra={safraSelecionada}
                formularioAtividade={formularioAtividade}
                formularioAtividadeAberto={formularioAtividadeAberto}
                erroAtividade={erroAtividade}
                onAdicionarAtividade={adicionarAtividade}
                onAtualizarAtividade={atualizarFormularioAtividade}
                onCancelarAtividade={cancelarAtividade}
                onMostrarFormularioAtividade={mostrarFormularioAtividade}
                onVoltar={voltarParaLista}
                onAlternarAtividade={alternarAtividade}
            />
        )
    }


    return (
        <main className="minha-safra__container">

            <section className="minha-safra__intro">
                <h1>
                    Minha Safra
                </h1>

                <p>
                    Organize suas produções, acompanhe informações importantes
                    da rotina no campo e planeje os próximos passos com apoio do
                    AgroTech.
                </p>
            </section>


            <section
                className="minha-safra__painel"
                aria-labelledby="minhas-safras-title"
            >
                <div className="minha-safra__painel-topo">
                    <div>
                        <span className="minha-safra__label">
                            Área de produção
                        </span>

                        <h2 id="minhas-safras-title">
                            Minhas Safras
                        </h2>
                    </div>

                    <button
                        className="minha-safra__botao"
                        type="button"
                        onClick={abrirFormulario}
                    >
                        Cadastrar nova safra
                    </button>
                </div>

                {formularioAberto && (
                    <form
                        id="formulario-safra"
                        className="minha-safra__formulario"
                        onSubmit={cadastrarSafra}
                    >
                        <div className="minha-safra__formulario-topo">
                            <div>
                                <span className="minha-safra__label">
                                    Nova safra
                                </span>

                                <h3>
                                    Cadastrar Safra
                                </h3>
                            </div>
                        </div>

                        <div className="minha-safra__campos">
                            <div className="minha-safra__campo">
                                <label htmlFor="safra-cultura">
                                    Cultura
                                </label>

                                <select
                                    id="safra-cultura"
                                    name="cultura"
                                    value={formulario.cultura}
                                    onChange={atualizarCampoFormulario}
                                    required
                                >
                                    {opcoesCulturas.map((opcao) => (
                                        <option
                                            key={opcao.valor}
                                            value={opcao.valor}
                                        >
                                            {opcao.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="minha-safra__campo">
                                <label htmlFor="safra-area">
                                    Área plantada (ha)
                                </label>

                                <input
                                    id="safra-area"
                                    name="area"
                                    type="number"
                                    min="0.1"
                                    step="0.1"
                                    value={formulario.area}
                                    onChange={atualizarCampoFormulario}
                                    inputMode="decimal"
                                    required
                                />
                            </div>

                            <div className="minha-safra__campo">
                                <label htmlFor="safra-data-plantio">
                                    Data do plantio
                                </label>

                                <input
                                    id="safra-data-plantio"
                                    name="dataPlantio"
                                    type="date"
                                    value={formulario.dataPlantio}
                                    onChange={atualizarCampoFormulario}
                                    required
                                />
                            </div>
                        </div>

                        {erroFormulario && (
                            <p
                                className="minha-safra__erro"
                                aria-live="polite"
                            >
                                {erroFormulario}
                            </p>
                        )}

                        <div className="minha-safra__formulario-acoes">
                            <button
                                className="minha-safra__botao"
                                type="submit"
                            >
                                Cadastrar Safra
                            </button>

                            <button
                                className="minha-safra__botao minha-safra__botao--secundario"
                                type="button"
                                onClick={cancelarCadastro}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}

                {safras.length === 0 ? (
                    <div className="minha-safra__vazio">
                        <i className="bi bi-journal-plus" aria-hidden="true"></i>

                        <h3>
                            Nenhuma safra cadastrada ainda
                        </h3>

                        <p>
                            Em breve, suas safras aparecerão aqui com informações
                            de cultura, área plantada, atividades e
                            acompanhamento da produção.
                        </p>
                    </div>
                ) : (
                    <div className="minha-safra__lista">
                        {safras.map((safra) => (
                            <SafraCard
                                key={safra.id}
                                safra={safra}
                                onVerSafra={verSafra}
                            />
                        ))}
                    </div>
                )}
            </section>


            <section className="minha-safra__calculadora">
                <CalculadoraProducao
                    mostrarBotaoPlanejar
                    onPlanejarProducao={prepararProducao}
                />
            </section>

        </main>
    )
}
