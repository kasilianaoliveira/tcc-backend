
## Como executar localmente 💻

- Baixe o projeto para sua máquina com `git clone https://github.com/kasilianaoliveira/tcc-backend.git`

- Execute no terminal o comando `yarn install` para instalar as dependencias necessárias.

- Utilize o comando `docker compose up` dentro da pasta do projeto , após rodar o container e ele estiver up, basta fazer a conexão com o banco, com pgadmin, dbeaver, utilizando as variaveis que estão dentro do arquivo **docker-compose**.

- Após isso  utilizar o comando `yarn prisma migrate dev`, para criar as tabelas dentro do BD.

- Depois de executado o comando acima, utilizar o comand `yarn prisma db seed ` para criar a tabela de items preenchida

- Execute o comando `yarn start`.

- Por fim, abra o insomnia e importe as requests utilizando o arquivo **RequestsInsominiaTcc**.

### Pronto agora é só testar os endpoints 😄