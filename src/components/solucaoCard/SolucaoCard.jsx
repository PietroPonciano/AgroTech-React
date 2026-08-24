export default function SolucaoCard({
    imagem,
    icone: Icone,
    titulo,
    destaque,
    descricao,
    solucao,
    resultado
}) {

    // ==============================
    // DIAGNÓSTICO DO CONSULTOR
    // ==============================

    const principal =
        resultado?.principal === solucao

    const secundaria =
        resultado?.secundarias?.includes(solucao)


    // Monta as classes do card conforme o resultado do diagnóstico
    let classeCard = "solucoes__card"

    if (principal) {
        classeCard += " solucao-recomendada"
    } else if (secundaria) {
        classeCard += " solucao-secundaria"
    }


    return (
        <article
            className={classeCard}
            data-solucao={solucao}
        >

            {/* Selo da recomendação principal */}
            {principal && (
                <span className="solucoes__selo">
                    Recomendado para você
                </span>
            )}


            {/* Selo das recomendações secundárias */}
            {secundaria && (
                <span className="solucoes__selo">
                    Também pode ajudar
                </span>
            )}


            {/* Imagem */}
            <img
                className="solucoes__card-image"
                src={imagem}
                alt={titulo}
            />


            {/* Conteúdo */}
            <div className="solucoes__card__content">

                <div
                    className="solucoes__card-icon"
                    aria-hidden="true"
                >
                    <Icone />
                </div>

                <h2 className="solucoes__card-title">
                    {titulo}
                </h2>

                <p className="solucoes__card-description">
                    <span className="solucoes__card-highlight">
                        {destaque}
                    </span>

                    {descricao}
                </p>

            </div>

        </article>
    )
}