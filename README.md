# Nome do Projeto

Este projeto é uma aplicação Todo List Vue.js desenvolvida com Vite, e inclui testes unitários com Vitest, testes end-to-end com Cypress e documentação de componentes com Storybook.

## 🚀 Começando

Siga as instruções abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Msferreira1998/tc-front.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd tc-front
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

## 🛠️ Scripts disponíveis

### Desenvolvimento

- `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento.
  - Aplicação disponível em http://localhost:5173.

### Build

- `npm run build` ou `yarn build`: Compila o projeto para produção.
  - Os arquivos estão disponíveis na pasta `dist`.

### Visualização do Build

- `npm run preview` ou `yarn preview`: Inicia um servidor de visualização do build.
  - A aplicação está disponível em http://localhost:4173.

### Testes

- `npm run test` ou `yarn test`: Executa os testes unitários com Vitest.
- `npm run coverage` ou `yarn coverage`: Gera o relatório de cobertura de testes.
- `npm run test:e2e` ou `yarn test:e2e`: Executa os testes end-to-end com Cypress.

### Storybook

- `npm run storybook` ou `yarn storybook`: Inicia o Storybook para visualização de componentes.
  - A aplicação está disponível em http://localhost:6006.
- `npm run build-storybook` ou `yarn build-storybook`: Compila o Storybook para produção.

## 🧪 Testes

### Testes Unitários (Vitest)

Os testes unitários estão localizados na pasta `tests`.

testes:

```bash
npm run test
```

Para gerar o relatório de cobertura de testes:

```bash
npm run coverage
```

### Testes End-to-End (Cypress)

Os testes end-to-end estão localizados na pasta `cypress/e2e`.

Para executar os testes end-to-end:

```bash
npm run test:e2e
```

Isso abrirá a interface do Cypress para executar os testes.

## 📚 Storybook

O Storybook é utilizado para documentar e visualizar componentes do projeto.

Para iniciar o Storybook:

```bash
npm run storybook
```

Para gerar o build do Storybook:

```bash
npm run build-storybook
```

## Feito com ❤️ por [Matheus Ferreira](https://github.com/Msferreira1998)
