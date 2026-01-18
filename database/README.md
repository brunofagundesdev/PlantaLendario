# 🎲 DATABASE

## Estrutura das Tabelas
- **`tipo`**: define o tipo do evento, para cada tipo existe suas especificacoes próprias, por isso essa tabela se relaciona com **especificacao**. Exemplos de tipo abaixo:
    - prova
    - trabalho
    - apresentacao

- **`especificacao`**: para cada tipo de evento pode haver diferentes espeficações como especificado abaixo. A tabela serve para deixar a modelagem mais limpa e extensível e se relaciona com **tipo**.
    - formato de entrega
    - recursos
    - instrucoes

- **`opcao`**: para cada especificação apontada existe uma série de opções, como checkboxs, isso facilita o CRUD dos eventos, deixando-o mais maleável. A tabela se relaciona diretamente com a **especificacao**. Exemplos de uso abaixo.
    - **Especificação:** formato de entrega
        - físico
        - .txt
        - .docx
        - .zip
    - **Especificação:** recursos
        - calculadora
        - livro
        - celular
    - **Especificação:** instrucoes
        - escrito
        - digitado