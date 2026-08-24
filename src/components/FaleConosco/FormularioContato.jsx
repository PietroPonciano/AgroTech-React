import { useEffect, useState } from "react";

import CampoContato from "./CampoContato";
import MensagemSucesso from "./MensagemSucesso";

import {
  LIMITE_MENSAGEM,
  validarCampo,
  validarFormulario,
} from "../../utils/validacaoContato";

export default function FormularioContato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState({});

  const [mensagemSucesso, setMensagemSucesso] =
    useState(false);

  const [enviando, setEnviando] = useState(false);


  /* ================================
     ALTERAÇÃO DOS CAMPOS
  ================================ */

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      const erro = validarCampo(id, value);

      setErrors((prev) => ({
        ...prev,
        [id]: erro,
      }));
    }
  };


  /* ================================
     BLUR
  ================================ */

  const handleBlur = (e) => {
    const { id, value } = e.target;

    const erro = validarCampo(id, value);

    setErrors((prev) => ({
      ...prev,
      [id]: erro,
    }));
  };


  /* ================================
     SUBMIT
  ================================ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (enviando) {
      return;
    }

    const novosErros = validarFormulario(formData);

    setErrors(novosErros);

    if (Object.keys(novosErros).length > 0) {
      const primeiroCampo =
        Object.keys(novosErros)[0];

      document
        .getElementById(primeiroCampo)
        ?.focus();

      return;
    }

    try {
      setEnviando(true);

      /*
       * Futuramente:
       *
       * await api.post("/contato", {
       *   nome: normalizarEspacos(formData.nome),
       *   email: formData.email.trim().toLowerCase(),
       *   mensagem: formData.mensagem.trim(),
       * });
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setMensagemSucesso(true);

      setFormData({
        nome: "",
        email: "",
        mensagem: "",
      });

      setErrors({});
    } finally {
      setEnviando(false);
    }
  };


  /* ================================
     SUCESSO
  ================================ */

  useEffect(() => {
    if (!mensagemSucesso) {
      return;
    }

    const timer = setTimeout(() => {
      setMensagemSucesso(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [mensagemSucesso]);


  return (
    <form
      onSubmit={handleSubmit}
      noValidate
    >

      {/* NOME */}

      <CampoContato
        id="nome"
        label="Nome Completo"
        error={errors.nome}
      >
        <input
          type="text"
          id="nome"
          value={formData.nome}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={100}
          autoComplete="name"
          className={
            errors.nome
              ? "is-invalid"
              : ""
          }
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={
            errors.nome
              ? "erro-nome"
              : undefined
          }
        />
      </CampoContato>


      {/* EMAIL */}

      <CampoContato
        id="email"
        label="E-mail"
        error={errors.email}
      >
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={254}
          autoComplete="email"
          className={
            errors.email
              ? "is-invalid"
              : ""
          }
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email
              ? "erro-email"
              : undefined
          }
        />
      </CampoContato>


      {/* MENSAGEM */}

      <CampoContato
        id="mensagem"
        label="Descrição da mensagem"
        error={errors.mensagem}
      >
        <textarea
          id="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={LIMITE_MENSAGEM}
          rows={5}
          className={
            errors.mensagem
              ? "is-invalid"
              : ""
          }
          aria-invalid={Boolean(errors.mensagem)}
          aria-describedby={
            errors.mensagem
              ? "erro-mensagem"
              : "contadorMensagem"
          }
        />

        <small id="contadorMensagem">
          {formData.mensagem.length} /{" "}
          {LIMITE_MENSAGEM} caracteres
        </small>
      </CampoContato>


      {/* BOTÃO */}

      <button
        type="submit"
        disabled={enviando}
      >
        {enviando
          ? "Enviando..."
          : "Enviar"}
      </button>


      {/* SUCESSO */}

      <MensagemSucesso
        mostrar={mensagemSucesso}
      />

    </form>
  );
}