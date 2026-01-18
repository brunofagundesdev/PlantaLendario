# 🌱 PlantaLendário

Calendário interativo para ajudar na organização e vizualização de provas, trabalhos, apresentações e ainda os registros das aulas.

## 👥 Equipe

- Bruno - Frontend / Integração
- Rafael - Banco de Dados
- Madono - Auxiliar Frontend / Testes

## 🧱 Estrutura
- frontend/ → interface do usuário
- backend/ → API e regras de negócio
- database/ → scripts SQL
- docs/ → documentação do projeto

## 🛠️Produção

Caso esteja começando no projeto, aqui o passo a passo de como executar o projeto:
- **`Node.JS`**
    - **Instalação**
        - **Windows**

            Para fazer a instalação no Windows basta acessar o site oficial do [Node.JS](https://nodejs.org/pt-br/download) e baixar a versão **LTS** mais recente. Desse jeito também virá instalado o ***npm***, o gerenciador de pacotes para o Node.JS. 
        
        - **Arch Linux**

            Para instalar o Node.JS para Arch Linux só é necessário executar o seguinte comando no terminal:
            ``` bash
            sudo pacman -S nodejs-lts-iron
            ```
            
        Para ter certeza que instalou corretamente, execute os comandos no terminal:

        Para ver a versão do **Node.JS**:
        ``` bash
        node -v 
        ```
        Para ver a versão do **npm**:
        ``` bash
        npm -v
        ```

    - **Framework**

        Para facilitar o backend do projeto, utilizamos o micro-framework ***Fastify*** para simplificar rotas, autorizações e autenticações, para isso, certifique-se de estar dentro da pasta `./backend` no terminal, instale-o com o comando:
        ``` bash
        npm install fastify
        ```
        Com isso, será criada a pasta `./backend/node_modules` onde está localizado o Fastify e suas dependências.
    

- **`Dotenv`**

    Para estabelecer conexão com o banco de dados usamos variáveis ambiente, para fazermos a manipulação delas vamos utilizar uma biblioteca do npm, para instalá-la, execute no terminal e dentro da pasta `./backend`:
    ``` bash
    npm i dotenv -D
    ```
- **`Postgres`**

    Para instalar o **postgres** para o projeto execute o seguinte comando no terminal estando na pasta `./backend`:
    ``` bash 
    npm install postgres
    ```    

