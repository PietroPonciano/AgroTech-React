# AgroTech 🌱

Projeto desenvolvido para o Challenge/PBL FIAP.

---

# Estrutura de Branches

O projeto utiliza 3 níveis de branch:

## `main`
Versão final estável do projeto.

- Deve conter apenas versões validadas
- Atualizada apenas em checkpoints/aprovações do grupo
- Nunca desenvolver diretamente nela

---

## `dev`
Branch principal de integração.

Utilizada para:
- juntar funcionalidades do grupo
- validar integração geral
- testar o sistema antes de ir para a `main`

Toda funcionalidade individual deve passar primeiro pela `dev`.

---

## `nomeDaPessoa`
Branch individual de desenvolvimento.

Exemplos:
- `guilherme`
- `pietro`
- `matheus`
- `estevao`
- `pedro`

Cada integrante deve:
- desenvolver apenas na própria branch
- evitar alterar código dos outros sem alinhamento
- subir alterações frequentemente

---

# Fluxo de Trabalho

### 1. Atualizar o projeto antes de começar

Sempre começar puxando as alterações mais recentes:

```bash
git checkout dev
git pull
```
### 2. Ir para sua branch

```bash
git checkout nomeDaSuaBranch
```

### 3. Atualizar sua branch com base na dev

```bash
git merge dev
```
### 4. Desenvolver normalmente

```bash
git add .
git commit -m "feat: descrição do que foi feito"
git push
```

### 5. Integrar na dev

Após concluir e testar:

```bash
git checkout dev
git merge nomeDaSuaBranch
git push
```

### 6. Atualizar a main

Somente após validação do grupo/checkpoint:

```bash
git checkout main
git merge dev
git push
```

## Regras Importantes

- Nunca modificar diretamente a main

- Sempre testar antes de subir alterações

- Sempre dar git pull antes de começar

- Evitar alterar código de outras pessoas sem alinhamento

- Fazer commits organizados e descritivos

- Evitar commits gigantes com muitas mudanças diferentes

- Manter organização do HTML/CSS/JS

- Comentar apenas quando realmente necessário

## Padrão de Commits

### Funcionalidade nova

```bash
feat: criando cards da home
```

### Correção

```bash
fix: corrigindo alinhamento do footer
```

### Estilo/Layout

```bash
style: ajustando responsividade da navbar
```

### Refatoração

```bash
refactor: reorganizando estrutura do css
```

## Estrutura Inicial Recomendada

```
AgroTech/
│
├── assets/
│   ├── img/
│   ├── icons/
│   └── videos/
│
├── css/
│
├── js/
│
├── pages/
│
├── index.html
│
└── README.md
```

## Objetivo do Fluxo

Organizar o desenvolvimento em equipe, evitar conflitos de merge e manter uma versão estável do projeto durante todo o desenvolvimento.