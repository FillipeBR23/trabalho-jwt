# Trabalho JWT

Trabalho de alditoria JWT

## Iniciando os passos a passos

1. Clone o repositorio https://github.com/FillipeBR23/trabalho-jwt.git
abrir no VScode

2. Intalar as dependencias:

npm intall

3. Tem que ter o Thunder Client no VScode

4. Para rodar o servidor:

npx nodemon server.js

5.  Requisições no Thunder:
coloca: POST http://localhost:3000/auth/register

vai na aba Body coloca o registro de usuário quer cadastrar, seguinte corpo:

{ "name": "Seu Nome", "email": "seu Email", "password": "Sua Senha" }

agora vai logar no servidor

coloca: POST http://localhost:3000/auth/login

na aba Body coloca o email e a senha  cadastrou, seguinte corpo:

{ "email": "Coloca o Email", "password": "Coloca a Senha" }

vai gerar chave , agora  ver a proteção 

coloca: GET http://localhost:3000/protected

na aba Auth coloca no tipo Bearer e dentro do campo Bearer Token tu coloca a chave que foi gerado !

