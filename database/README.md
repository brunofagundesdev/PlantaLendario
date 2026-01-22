# 🗄️ Database – PlantaLendário

## Visão Geral

O banco de dados do **PlantaLendário** foi a **primeira camada desenvolvida** do projeto e serve como base estrutural para todo o sistema.

Seu objetivo é modelar a rotina acadêmica com foco em **eventos**, garantindo organização, integridade dos dados e clareza semântica para o back-end.

O modelo foi pensado antes da implementação das rotas, o que permitiu definir responsabilidades claras para cada entidade e evitar decisões apressadas guiadas apenas pelo código.

---

## Tecnologias e Padrões

* **Banco:** PostgreSQL
* **Modelo:** Relacional
* **Hospedagem:** Neon

### Convenções adotadas

* Nomes de tabelas e colunas em **inglês**
* `snake_case`
* Tabelas no **singular**
* Uso de `UUID` como chave primária
* Campos de auditoria (`created_at`, `updated_at`) quando aplicável
* Separação entre dados estruturais e arquivos anexados

> ⚠️ A tabela `account` é utilizada no lugar de `user`, pois `user` é palavra reservada no PostgreSQL.

---

## Filosofia do Modelo

O banco é **orientado a eventos**. Toda a lógica acadêmica — provas, trabalhos, aulas, anúncios e atividades — gira em torno da entidade `event`.

Outras entidades existem para **especializar**, **organizar** ou **relacionar** eventos, sem duplicar responsabilidades.

---

## Entidades Core

As tabelas abaixo representam o núcleo do sistema. Sem elas, o PlantaLendário não funciona.

### `event`

Entidade central do sistema. Representa qualquer evento acadêmico relevante que possa ser exibido no calendário.

Responsabilidades:

* Datas e horários importantes
* Associação com tipos, especificações e opções
* Versionamento via revisões
* Relacionamento com arquivos e avaliações

---

### `account`

Representa os usuários do sistema.

Responsabilidades:

* Identificação do usuário
* Associação com permissões (via roles)
* Auditoria de ações administrativas

---

### `lesson`

Representa uma aula específica.

Responsabilidades:

* Associação com disciplina
* Ligação com horários
* Base para registros de presença e conteúdo

---

### `teacher`

Representa professores vinculados às aulas e disciplinas.

Responsabilidades:

* Identificação do docente
* Associação com aulas e disciplinas

---

## Entidades de Suporte e Organização

### Permissões

* `role`
* `account_role`

Utilizadas para controle de acesso e permissões. As regras de autorização são aplicadas no back-end, enquanto o banco garante a estrutura relacional.

---

### Tipificação de Eventos

* `event_type`
* `event_specification`
* `event_option`

Essas tabelas permitem categorizar eventos de forma flexível, evitando campos genéricos ou flags espalhadas.

---

### Revisões e Histórico

* `event_revision`

Responsável por manter histórico de alterações em eventos, permitindo rastreabilidade e futuras auditorias.

---

### Estrutura Acadêmica

* `discipline`
* `schedule`
* `timetable`
* `location`

Modelam a organização acadêmica, horários e locais associados às aulas e eventos.

---

### Avaliações

* `assessment`

Representa provas, trabalhos ou outras formas de avaliação associadas a eventos ou aulas.

---

## Arquivos e Anexos

Arquivos são tratados separadamente para evitar acoplamento excessivo.

* `file`
* `event_file`
* `discipline_file`
* `announcement_file`

Cada tabela relacional associa arquivos às entidades correspondentes.

---

## Comunicação e Suporte

### `announcement`

Utilizada para **avisos gerais aos estudantes**, como:

* Oportunidades de bolsa
* Comunicados importantes
* Informações acompanhadas de links ou arquivos

Anúncios não representam eventos no calendário, mas comunicações informativas.

---

### `support`

Representa **atendimentos de professores**, como horários de atendimento ou plantões.

Responsabilidades:

* Associação com disciplina
* Definição de local e horário
* Comunicação de disponibilidade docente

---

## Outras Entidades

### `list`

Representa **listas de exercícios** associadas a uma disciplina.

Responsabilidades:

* Organizar exercícios propostos
* Associação com arquivos (PDFs, listas, materiais)
* Ligação com o usuário responsável pela criação

---

## Relacionamentos

O modelo relacional foi desenhado explicitamente para refletir a estrutura acadêmica e os fluxos reais de uso do sistema.

Abaixo estão descritos os principais relacionamentos entre as entidades, conforme definido no diagrama (PlantUML).

### Estrutura Acadêmica

* `discipline` → `teacher` (N:1)

  * Cada disciplina está associada a um professor responsável.

* `lesson` → `discipline` (N:1)

  * Aulas pertencem a uma disciplina específica.

* `lesson` → `timetable` (N:1)

  * Cada aula ocorre em um horário definido.

* `register` → `lesson` (N:1)

* `register` → `location` (N:1)

  * Registros conectam aulas a locais físicos.

* `assessment` → `lesson` (N:N)

* `assessment` → `discipline` (N:1)

  * Avaliações podem estar ligadas a múltiplas aulas, mas pertencem a uma disciplina.

---

### Eventos e Tipificação

#### Diferença entre `schedule` e `timetable`

O modelo diferencia explicitamente dois conceitos de tempo:

* **`timetable`**: representa algo **recorrente**, como aulas semanais ou atendimentos fixos
* **`schedule`**: representa algo **pontual**, como oficinas ou eventos que ocorrem uma única vez

Eventos podem possuir **múltiplos `schedule`**, permitindo representar eventos com várias datas.

---

#### Tipificação de Eventos

* `event` → `event_type` (N:1)
* `event_type` → `event_specification` (N:N)
* `event_specification` → `event_option` (1:N)

Esse encadeamento permite classificar eventos de forma flexível e extensível, sem depender de flags ou enums rígidos.

---

### Usuários e Permissões

* `user` → `event` (N:1)

  * Usuários podem criar eventos.

* `user` ↔ `role` (N:N) via `user_role`

  * Controle de permissões estruturado no banco.

* `list` → `user` (N:1)

  * Listas pertencem a usuários.

---

### Comunicação e Suporte

* `announcement` → `user` (N:1)

* `announcement` ↔ `file` (N:N) via `announcement_file`

* `support` → `discipline` (N:1)

* `support` → `location` (N:1)

* `support` → `timetable` (N:1)

---

### Arquivos

* `event` ↔ `file` (N:N) via `event_file`
* `discipline` ↔ `file` (N:N) via `discipline_file`
* `list` ↔ `file` (N:N)

Arquivos são sempre associados por tabelas intermediárias para evitar acoplamento direto.

---

### Revisões de Evento

* `event` → `event_revision` (1:N)

A tabela `event_revision` representa **pedidos de revisão de eventos** feitos por usuários.

Esse mecanismo permite que estudantes solicitem correções quando um evento é criado incorretamente (por exemplo, data ou horário errado), sem alterar diretamente o evento original. A aprovação ou rejeição da revisão é tratada no back-end.

---

## Regras Implícitas no Banco

O banco garante:

* Existência de chaves primárias
* Integridade referencial entre entidades
* Campos obrigatórios via `NOT NULL`
* Unicidade onde necessário

O banco **não** garante:

* Permissões de acesso
* Regras de autorização
* Lógica de negócio dependente de contexto

Essas responsabilidades pertencem ao back-end.

---

## Versionamento e Evolução

* O banco é versionado via arquivo SQL
* Alterações futuras devem ocorrer principalmente como adição de novos campos

O modelo foi projetado para crescer sem necessidade imediata de grandes refatorações estruturais.

---

## Observação Final

Este banco prioriza clareza, extensibilidade e coerência semântica. Ele não tenta resolver tudo sozinho, mas fornece uma base sólida para que o back-end aplique regras de negócio de forma segura e organizada.
