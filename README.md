# 🌱 PlantaLendário

## Visão Geral

O **PlantaLendário** é um **calendário acadêmico centralizado** voltado para estudantes, criado para resolver um problema simples e recorrente: a falta de um lugar único e confiável onde seja possível visualizar **provas, trabalhos, aulas e eventos acadêmicos**.

Em vez de depender de mensagens soltas, grupos de WhatsApp ou da memória coletiva da turma, o PlantaLendário propõe uma visualização clara, organizada e acessível das principais datas acadêmicas.

Este projeto está sendo desenvolvido como **estudo e portfólio**, com foco em boas práticas de arquitetura, organização de código e documentação técnica.

---

## Problema que o Projeto Resolve

No contexto acadêmico, informações importantes costumam ficar dispersas:

* Datas de provas e entregas são esquecidas ou confundidas
* Eventos e oficinas são divulgados de forma desorganizada
* Estudantes constantemente precisam perguntar datas básicas

O PlantaLendário centraliza essas informações em um único sistema, reduzindo ruído, retrabalho e dependência de comunicação informal.

---

## Público-Alvo

* Estudantes (principalmente colegas de turma)
* Pessoas interessadas em entender ou avaliar o projeto como estudo técnico
* Recrutadores ou desenvolvedores curiosos sobre a arquitetura adotada

---

## Escopo do Projeto

### Funcionalidades Planejadas (Principais)

* Visualização de eventos acadêmicos em formato de calendário
* Cadastro de eventos (provas, trabalhos, oficinas, eventos gerais)
* Registro de aulas e horários
* Informações gerais relacionadas à rotina acadêmica

### Fora de Escopo

* Upload ou entrega de trabalhos
* Chat ou comunicação em tempo real
* Ferramentas de colaboração entre usuários

O foco do projeto é **visualização e organização da informação**, não execução de tarefas acadêmicas.

---

## Arquitetura Geral

O projeto é dividido em três camadas principais:

### Front-end

* HTML
* CSS
* JavaScript (vanilla)

O front-end será responsável apenas pela interface e consumo da API, mantendo a lógica de negócio fora do cliente.

### Back-end

* Node.js
* Fastify
* Arquitetura modular

O back-end concentra toda a lógica de negócio, validações e regras do sistema, expondo uma API REST.

### Banco de Dados

* PostgreSQL
* Hospedagem: Neon
* Modelo relacional

O banco foi modelado previamente e contém cerca de 22 tabelas, representando as entidades centrais do sistema.

---

## Back-end

### Responsabilidades

* Gerenciamento das entidades do sistema
* Regras de negócio
* Exposição de rotas REST
* Futuramente: autenticação, autorização e validação de dados

### Principais Entidades

Algumas das entidades presentes no sistema:

* User
* Event
* Assessment
* Lesson
* Schedule
* Announcement
* Register

Cada entidade possui seu próprio conjunto de rotas e responsabilidades, seguindo a proposta de modularização do projeto.

---

## Banco de Dados

* Banco relacional (PostgreSQL)
* Relacionamentos entre entidades bem definidos
* Integridade referencial aplicada

O modelo do banco serve como base estrutural do sistema e antecede boa parte do desenvolvimento do back-end.

---

## Estado Atual do Projeto

Atualmente, o projeto encontra-se em estágio inicial:

* Banco de dados modelado e operacional
* Back-end em desenvolvimento, com rotas iniciais implementadas
* Front-end ainda não iniciado
* Não há autenticação nem controle de permissões

O sistema roda localmente, mas ainda não está pronto para uso em produção.

---

## Por que não está em produção?

O projeto ainda não foi colocado em produção por não possuir:

* Interface finalizada
* Autenticação e controle de permissões
* Cobertura completa das regras de negócio

A prioridade atual é estruturar corretamente o sistema antes de pensar em deploy.

---

## Documentação

Além deste README principal, o projeto possui documentação específica em:

* `/database`
* `/backend`
* `/frontend`

Cada camada contém um README próprio explicando seu funcionamento interno.

---

## Status

🚧 Projeto em desenvolvimento

---

## Observação Final

Este projeto prioriza organização, clareza e aprendizado. O objetivo não é apenas "funcionar", mas servir como um exemplo sólido de arquitetura e documentação para projetos acadêmicos e de portfólio.
