import "./quemSomos.styles.css";

export default function QuemSomos() {
  return (
    <section className="quem-somos">
      <div className="quem-somos-container">

        <div className="quem-somos-texto">
          <span className="subtitulo">QUEM SOMOS</span>

          <h2>
            Nossa história
          </h2>

          <p>
            A AgroTech nasceu com o objetivo de aproximar a tecnologia
            do pequeno produtor rural brasileiro.
          </p>

          <p>
            Acreditamos que informações simples e acessíveis podem
            ajudar agricultores a tomar decisões melhores, reduzir
            desperdícios e aumentar a produtividade.
          </p>

          <p>
            Por isso, desenvolvemos uma solução digital pensada para
            facilitar o planejamento do plantio, o acompanhamento
            climático e a gestão da produção.
          </p>

          <div className="quem-somos-destaques">
            <div>
              <strong>01</strong>
              <span>Tecnologia acessível</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Foco no produtor</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Agricultura sustentável</span>
            </div>
          </div>
        </div>
<div className="quem-somos-imagem">
          <img
            src= "/agricultor.jpg"                    // ← usa o import
            alt="Agricultor trabalhando no campo"
          />
        </div>
      </div>
    </section>
  );
}