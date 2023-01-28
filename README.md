# <p align = "center"> MyWallet - back </p>

## :clipboard: Descrição

O **mywallet** é um aplicativo focado na organização financeira, onde o usuário indica os valores recebidos e pagos durante o período. O intuito desse aplicativo é facilitar o monitoramento da saúde financeira do usuário.

---

## :computer: Tecnologias e Conceitos

- REST APIs
- Node.js (v16.17.0)
- JavaScript
- MongoDB

---

## :rocket: Rotas

```yml
POST '/cadastro'
- Rota para cadastrar um usuário;
Headers: {}
Body: {}
```

```yml
POST '/'
- Rota para fazer login;
Headers: {}
Body: {}
```

```yml
GET /menu (autenticada)
- Rota para obter os dados da conta do usuário;
Headers: { "Authorization": "Bearer $token" }
Body: {}
```

```yml
DELETE /menu (autenticada)
- Rota para apagar o dado selecionado do histórico;
Headers: { Authorization: Bearer $token }
Body: {
    transferId: ID da transferência
}
```

```yml
POST /entrada (autenticada)
  - Rota para adicionar novo valor em sua conta;
Headers: { Authorization: Bearer $token }
Body: {
    price: 1200,
    description: descriçaõ da ação,
    type: 'recive' ou 'pay'
     }
```

```yml
POST /saida
  - Rota para indicar pagamento realizdo;
Headers: { 'Authorization': 'Bearer $token' }
Body: {
    price: 1200,
    description: descriçaõ da ação,
    type: 'recive' ou 'pay'
    }
```

---

## 🏁 Rodando a aplicação

- Local

Primeiro, clone o repositório com o comando abaixo:

```
git clone git@github.com:MatGueler/projeto13-mywallet-back.git
```

Assim, entre na pasta do projeto dentro do terminal e rode o comando para instalar as dependências do projeto.

```
npm install
```

Por fim, basta inicializar o projeto usando o comando abaixo:

```
npm run dev
```

- Banco de dados

Como nesse projeto utilizamos o mongoDB como banco de dados para armazenar os dados, o programa deve estar instalado em sua máquina, acessee o site [MONGO](https://www.mongodb.com/).

Garantindo que o mongo esteja instalado, basta iniciar a instância, abrindo uma aba do terminal e rodando o comando abaixo:

```
mongod --dbpath ~/.mongo
```
