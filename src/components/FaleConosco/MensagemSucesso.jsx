export default function MensagemSucesso({
  mostrar,
}) {
  return (
    <div
      className={`mensagem-sucesso ${
        mostrar ? "mostrar" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      Mensagem enviada com sucesso!
      Entraremos em contato em breve.
    </div>
  );
}