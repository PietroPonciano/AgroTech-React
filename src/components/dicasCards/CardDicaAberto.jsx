export function CardAberto({ dica, aoFechar }) {
    const tituloId = `dica-modal-titulo-${dica.id}`;

    return (
        <div className="dica-modal__fundo">
            <button
                className="dica-modal__backdrop"
                type="button"
                onClick={aoFechar}
                aria-label="Fechar dica"
            />

            <dialog
                open
                className="dica-modal"
                aria-modal="true"
                aria-labelledby={tituloId}
            >
                <div className="dica-modal__media">
                    <img
                        src={dica.imagem}
                        alt={dica.imagemAlt}
                        className="dica-modal__imagem"
                    />

                    <button
                        className="dica-modal__fechar"
                        type="button"
                        onClick={aoFechar}
                        aria-label="Fechar dica"
                    >
                        <i className="bi bi-x-lg" aria-hidden="true" />
                    </button>
                </div>

                <div className="dica-modal__conteudo">
                    <h2 id={tituloId}>{dica.titulo}</h2>
                    <p className="dica-modal__resumo">{dica.descricao}</p>
                    <div className="dica-modal__divisor" />
                    <p className="dica-modal__texto">{dica.explicacao}</p>

                    <button className="dica-modal__voltar" type="button" onClick={aoFechar}>
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                        <span>Voltar para as dicas</span>
                    </button>
                </div>
            </dialog>
        </div>
    );
}

export default CardAberto;
