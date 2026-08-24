import { ChevronDown } from "lucide-react";

const perguntas = [
  {
    pergunta: "O que é a AgroTech?",
    resposta:
      "A AgroTech é uma plataforma voltada para soluções no agronegócio.",
  },
  {
    pergunta: "Como posso entrar em contato?",
    resposta:
      "Você pode acessar a página de contato ou enviar um e-mail para suporte@agrotech.com.",
  },
  {
    pergunta: "Os serviços são pagos?",
    resposta:
      "Oferecemos planos gratuitos e pagos, dependendo da necessidade.",
  },
  {
    pergunta: "Posso usar no celular?",
    resposta:
      "Sim, a plataforma é totalmente responsiva.",
  },
];

export default function FAQContato() {
  return (
    <section className="faq-contato">
      <h2>Perguntas Frequentes</h2>

      <div className="perguntas-faq-contato">
        {perguntas.map((item) => (
          <details key={item.pergunta}>
            <summary>
              <span>{item.pergunta}</span>

              <ChevronDown
                className="faq-chevron"
                size={20}
                aria-hidden="true"
              />
            </summary>

            <p>{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}