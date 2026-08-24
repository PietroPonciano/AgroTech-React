import FAQContato from "../../components/FaleConosco/FAQContato";
import FormularioContato from "../../components/FaleConosco/FormularioContato";
import ImagemContato from "../../components/FaleConosco/ImagemContato";
import "./faleConosco.styles.css";

export default function FaleConosco() {
  return (
    <main className="fale-conosco-page">
      <FAQContato />

      <section className="fale-conosco">
        <h2>Fale Conosco</h2>

        <div className="container-form">
          <FormularioContato />

          <ImagemContato />
        </div>
      </section>
    </main>
  );
}