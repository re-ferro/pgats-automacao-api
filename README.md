# API de Automação de Testes

Esta API foi desenvolvida para fins de aprendizado de testes e automação a nível de API, utilizando Node.js, Express e Swagger.

## Funcionalidades
- **Registro de usuário**: Não permite usuários duplicados.
- **Login**: Login e senha obrigatórios.
- **Consulta de usuários**
- **Transferência de valores**: Só permite transferências acima de R$ 5.000,00 para favorecidos.
- **Documentação Swagger**: Disponível em `/api-docs`.

## Estrutura de Diretórios
```
controller/   # Lógica das rotas
service/      # Regras de negócio
model/        # Dados em memória
app.js        # Configuração do Express
server.js     # Inicialização do servidor
swagger.json  # Documentação da API
```

## Instalação
1. Instale o Node.js (v14+).
2. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```

## Como rodar
```powershell
node server.js
```
A API estará disponível em `http://localhost:3000`.

## Endpoints
- `POST /register` - Registro de usuário
- `POST /login` - Login
- `GET /users` - Consulta de usuários
- `POST /transfer` - Transferência de valores
- `GET /transfers` - Consulta de transferências
- `GET /api-docs` - Documentação Swagger

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar.
- Para testar, utilize ferramentas como Postman, Insomnia ou automação com Supertest.
