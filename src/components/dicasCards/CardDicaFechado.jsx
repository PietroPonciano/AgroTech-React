export function CardFechado({ dica, aoAbrir }) {
    return (
        <article className="dica-card">
            <img
                src={dica.imagem}
                alt={dica.imagemAlt}
                className="dica-card__imagem"
                loading="lazy"
            />

            <div className="dica-card__conteudo">
                <h3>{dica.titulo}</h3>
                <p>{dica.descricao}</p>

                <button className="dica-card__botao" type="button" onClick={aoAbrir}>
                    <span>Ler dica completa</span>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                </button>
            </div>
        </article>
    );
}

export default CardFechado;
