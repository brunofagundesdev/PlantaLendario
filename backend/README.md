# Backend

Backend do projeto **Plantalendário**, responsável por:
- autenticação de usuários
- regras de acesso
- comunicação com o banco de dados (Neon)
- proteção das rotas da aplicação

Este backend é consumido pelo frontend via requisições HTTP (`GET`, `POST`, `PATCH`, `DELETE`).

---

## 🧠 Visão Geral da Arquitetura

O backend segue uma arquitetura simples e organizada, separando responsabilidades:

Requisição → Rotas → Middlewares → Controllers → Services → Banco

Cada camada tem um papel bem definido, evitando código bagunçado e facilitando manutenção.

---

## 📂 Estrutura de Pastas
```
src/
├── server.js
├── app.js
├── routes/
├── controllers/
├── middlewares/
├── services/
└── utils/
```

Abaixo está a explicação de cada parte.

---

## 📄 server.js
Responsável por **iniciar o servidor**.

Funções:
- define a porta
- faz o servidor “escutar” requisições

Não contém regra de negócio nem lógica de aplicação.

---

## 📄 app.js
Arquivo central da aplicação.

Funções:
- cria a instância do servidor (Fastify)
- configura middlewares globais (JSON, CORS, etc.)
- registra todas as rotas da aplicação

Toda requisição passa por aqui.

---

## 📁 routes/
Define **os caminhos da API**.

Exemplos:
- `/login`
- `/events`
- `/users`

Cada rota apenas aponta qual controller será executado.  
Não contém lógica de negócio.

Exemplo:

POST /login → auth.controller.js
GET /events → events.controller.js


---

## 📁 controllers/
Contém a **lógica dos endpoints**.

Funções:
- recebe dados da requisição (`request`)
- valida informações
- chama os services
- retorna a resposta HTTP (`response`)

Controllers decidem **o que fazer**, mas não sabem **como o banco funciona**.

---

## 📁 services/
Responsável por **acessar recursos externos**.

Aqui ficam:
- conexão com o Neon
- consultas ao banco de dados
- integrações externas

Os controllers chamam os services para buscar ou salvar dados.

---

## 📁 middlewares/
Executados **antes dos controllers**.

Funções comuns:
- verificar autenticação
- validar permissões
- bloquear acessos indevidos

Exemplo:
- `auth.js` → verifica se o usuário está autenticado antes de acessar a rota.

---

## 📁 utils/
Funções auxiliares reutilizáveis.

Exemplos:
- padronização de erros
- helpers genéricos
- funções utilitárias

Não contém regra de negócio.

---

## 🔐 Segurança
- Dados sensíveis ficam em variáveis de ambiente (`.env`)
- O arquivo `.env` **não deve subir para o repositório**
- Controle de acesso é feito via backend (middlewares + regras)

---

## 🧪 Fluxo de uma Requisição

1. O frontend envia uma requisição HTTP
2. O servidor recebe (`server.js`)
3. A aplicação processa (`app.js`)
4. A rota identifica o endpoint
5. Middlewares validam acesso
6. Controller executa a lógica
7. Service acessa o banco
8. Resposta é enviada ao frontend

---

## 🚀 Objetivo do Projeto
Além de atender o Plantalendário, este backend serve como **base de aprendizado** para:
- autenticação
- autorização
- APIs REST
- arquitetura backend real

---

## 🧠 Observação Final
Frontend controla **o que aparece na tela**.  
Backend controla **o que o usuário pode fazer**.

Qualquer regra importante deve estar no backend.