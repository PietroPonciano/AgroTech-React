export const LIMITE_MENSAGEM = 500;
export const MINIMO_MENSAGEM = 10;

export function normalizarEspacos(valor) {
  return valor.trim().replace(/\s+/g, " ");
}

export function validarNome(nome) {
  const nomeNormalizado = normalizarEspacos(nome);

  if (!nomeNormalizado) {
    return "O nome é obrigatório.";
  }

  if (nomeNormalizado.length < 5) {
    return "Informe seu nome completo.";
  }

  if (nomeNormalizado.length > 100) {
    return "O nome deve possuir no máximo 100 caracteres.";
  }

  const nomeRegex =
    /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['-][A-Za-zÀ-ÖØ-öø-ÿ]+)?(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['-][A-Za-zÀ-ÖØ-öø-ÿ]+)?)+$/;

  if (!nomeRegex.test(nomeNormalizado)) {
    return "Digite um nome válido usando apenas letras.";
  }

  const partes = nomeNormalizado.split(" ");

  if (partes.length < 2) {
    return "Informe nome e sobrenome.";
  }

  if (partes.some((parte) => parte.length < 2)) {
    return "Nome e sobrenome devem possuir pelo menos 2 letras.";
  }

  return "";
}

export function validarEmail(email) {
  const emailNormalizado = email.trim().toLowerCase();

  if (!emailNormalizado) {
    return "O e-mail é obrigatório.";
  }

  if (emailNormalizado.length > 254) {
    return "O e-mail deve possuir no máximo 254 caracteres.";
  }

  if (/\s/.test(emailNormalizado)) {
    return "O e-mail não pode conter espaços.";
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(emailNormalizado)) {
    return "Digite um e-mail válido.";
  }

  if (emailNormalizado.includes("..")) {
    return "O e-mail não pode possuir pontos consecutivos.";
  }

  return "";
}

export function validarMensagem(mensagem) {
  const mensagemNormalizada = mensagem.trim();

  if (!mensagemNormalizada) {
    return "A descrição da mensagem é obrigatória.";
  }

  if (mensagemNormalizada.length < MINIMO_MENSAGEM) {
    return `A mensagem deve possuir pelo menos ${MINIMO_MENSAGEM} caracteres.`;
  }

  if (mensagemNormalizada.length > LIMITE_MENSAGEM) {
    return `A mensagem deve possuir no máximo ${LIMITE_MENSAGEM} caracteres.`;
  }

  if (!/[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(mensagemNormalizada)) {
    return "Digite uma mensagem válida.";
  }

  return "";
}

export function validarCampo(campo, valor) {
  switch (campo) {
    case "nome":
      return validarNome(valor);

    case "email":
      return validarEmail(valor);

    case "mensagem":
      return validarMensagem(valor);

    default:
      return "";
  }
}

export function validarFormulario(formData) {
  const novosErros = {};

  const campos = ["nome", "email", "mensagem"];

  campos.forEach((campo) => {
    const erro = validarCampo(campo, formData[campo]);

    if (erro) {
      novosErros[campo] = erro;
    }
  });

  return novosErros;
}