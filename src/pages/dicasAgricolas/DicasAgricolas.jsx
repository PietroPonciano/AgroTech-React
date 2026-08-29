import {dadosDicas} from "./data/dadosDicas.js";
import CardFechado from "../../components/dicasCards/CardDicaFechado.jsx";
import CardAberto from "../../components/dicasCards/CardDicaAberto.jsx";
import { useEffect, useState } from "react";

import "./dicasAgricolas.css";

export function SessaoDicasAgricolas() {
    const [dicaAberta, setDicaAberta] = useState(null);

    useEffect(() => {
        if (!dicaAberta) return undefined;

        const overflowAnterior = document.body.style.overflow;

        function fecharComEsc(evento) {
            if (evento.key === "Escape") {
                setDicaAberta(null);
            }
        }

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", fecharComEsc);

        return () => {
            document.body.style.overflow = overflowAnterior;
            window.removeEventListener("keydown", fecharComEsc);
        };
    }, [dicaAberta]);

    return (
        <section className="dicas-section" aria-labelledby="dicas-title">
            <div className="dicas-container">
                <div className="dicas-intro">
                    <span className="dicas-label">Conhecimento para o campo</span>
                    <h2 id="dicas-title">Dicas agrícolas</h2>
                    <p>
                        Orientações simples para cuidar melhor da plantação, aproveitar os
                        recursos da propriedade e planejar a próxima produção.
                    </p>
                </div>

                <div className="dicas-grid">
                    {dadosDicas.map((dica) => (
                        <CardFechado
                            key={dica.id}
                            dica={dica}
                            aoAbrir={() => setDicaAberta(dica)}
                        />
                    ))}
                </div>
            </div>

            {dicaAberta && (
                <CardAberto
                    dica={dicaAberta}
                    aoFechar={() => setDicaAberta(null)}
                />
            )}
        </section>
    );
}

export default SessaoDicasAgricolas;
