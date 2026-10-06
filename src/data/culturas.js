export const culturas = {
    milho: {
        nome: "Milho",
        produtividade: 5426,
        fonte: "IBGE/PAM 2024"
    },

    feijao: {
        nome: "Feijão",
        produtividade: 1147,
        fonte: "IBGE/PAM 2024"
    },

    tomate: {
        nome: "Tomate",
        produtividade: 72760,
        fonte: "IBGE/PAM 2024"
    },

    alface: {
        nome: "Alface",
        produtividade: 18600,
        fonte: "Embrapa"
    },

    mandioca: {
        nome: "Mandioca",
        produtividade: 15465,
        fonte: "IBGE/PAM 2024"
    }
}


export const opcoesCulturas = Object.entries(culturas).map(
    ([valor, dados]) => ({
        valor,
        nome: dados.nome
    })
)


export function calcularProducao(cultura, area) {
    const culturaSelecionada = culturas[cultura]

    if (!culturaSelecionada) {
        return 0
    }

    return Number(area) * culturaSelecionada.produtividade
}


export function formatarNumero(valor) {
    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 1
    }).format(valor)
}


export function formatarPeso(valor) {
    if (valor >= 1000) {
        return `${formatarNumero(valor / 1000)} t`
    }

    return `${formatarNumero(valor)} kg`
}
