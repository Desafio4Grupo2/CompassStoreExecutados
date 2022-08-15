<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# 🏪 Compass Store

Desafio proposto ao fim da quarta Sprint do **Programa de Bolsas de NodeJS da [Compass.uol](https://compass.uol/)**.

## 🧾 Sumário
* ### [Como inicializar](#-como-inicializar)
* ### [Endpoints](#-endpoints)
* ### [Schemas](#-schemas)

## 📖 Descrição
A empresa americana Compass Store pretende expandir sua loja virtual para atender o público brasileiro, para isso será necessário a criação de uma API em NodeJS que realize o controle de [Clientes](#client-table), [Produtos](#product-table) e [Vendas](#sale-table)

## 🧰 Tecnologias

<p>
  <img src="https://user-images.githubusercontent.com/65569815/182266557-f2d0c589-fe31-4d65-b867-cb40385066a0.svg" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/182253645-6966537e-18ed-4c47-974b-22510cc3d834.png" width="100">
</p>

Para o desenvolvimento deste projeto, utilizamos a linguagem Typescript, NodeJS com Express, Mongoose para a conexão ao banco de dados Mongo.
<br/>

## 🔑 Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina o Node.js, também é necessário uma collection no MongoDB Atlas e não se esqueça de criar a pasta `.env` seguindo o arquivo `.env.example`.

## 🏁 Como inicializar

Como descrito nos requisitos acima, primeiramente você precisa instalar o [NodeJS](https://nodejs.org/en/)
<br/>
Depois você irá executar os seguintes comandos:

```bash
# Clona este repositório
$ git clone https://github.com/Desafio4Grupo2/CompassStoreExecutados.git

# Acessa a pasta do projeto
$ cd CompassStoreExecutados

# Instala as dependências
$ npm install
```

Agora que você já possui as dependências instalas, basta iniciar o projeto (Não se esqueça de configurar as variáveis de ambiente no arquivo `.env`)

```bash
# Inicia a aplicação em localhost:3000
$ npm run dev

```

## 🚪 Endpoints

### Client Endpoints
|       Route           |    Method    |                   Description                    |                                                                         
|   ---------------     | :----------: |  ----------------------------------------------  |                                                                           
|  `/client`            |    POST      |  Creates a client                                | 
|  `/client`            |    GET       |  Gets all of clients                             |   
|  `/client/:id`        |    GET       |  Gets the client by its ID                       |   
|  `/client/:id`        |    PUT       |  Updates the client by its ID                    |                                                        
|  `/client/:id`        |    DELETE    |  Deletes the client by its ID                    |                 

### Product Endpoints
|       Route           |    Method    |                   Description                     |                                                                         
|   ---------------     | :----------: |  ----------------------------------------------   |                                                                           
|  `/product`           |    POST      |  Creates a product                                | 
|  `/product`           |    GET       |  Gets all of products                             |   
|  `/product/:id`       |    GET       |  Gets the product by its ID                       |   
|  `/product/:id`       |    PUT       |  Updates the product by its ID                    |                                                        
|  `/product/:id`       |    DELETE    |  Deletes the product by its ID                    |

### Sale Endpoints
|       Route           |    Method    |                   Description                     |                                                                         
|   ---------------     | :----------: |  ----------------------------------------------   |                                                                           
|  `/sale`              |    POST      |  Creates a sale                                   | 
|  `/sale`              |    GET       |  Gets all of sales                                |   
|  `/sale/:id`          |    GET       |  Gets the sale by its ID                          |   
|  `/sale/:id`          |    PUT       |  Updates the sale by its ID                       |                                                        
|  `/sale/:id`          |    DELETE    |  Deletes the sale by its ID                       |     

## 🧱 Schemas

### Client Table
|    FieldName   |    Type   | Required | Unique |
|----------------|:---------:|:--------:|:------:|
| `id`           | ObjectId  | true     | true   |
| `cpf`          | String    | true     | true   |
| `name`         | String    | true     | false  |
| `birthday`     | String    | true     | false  |
| `email`        | String    | true     | true   |
| `password`     | String    | true     | false  |
| `cep`          | String    | true     | false  |
| `uf`           | String    | true     | false  |
| `city`         | String    | true     | false  |
| `address`      | String    | true     | false  |
| `number`       | String    | true     | false  |
| `complement`   | String    | false    | false  |
| `neighborhood` | String    | true     | false  |

### Product Table
|     FieldName    |    Type   | Required | Unique |
|------------------|:---------:|:--------:|:------:|
| `id`             | ObjectId  | true     | true   |
| `category`       | String    | true     | false  |
| `currency`       | String    | true     | false  |
| `price`          | Number    | true     | false  |

### Sale Table
|     FieldName    |    Type   | Required | Unique | Primary Key | Foreign Key |
|------------------|:---------:|:--------:|:------:|:-----------:|:-----------:|
| `id`             | ObjectId  | true     | true   | true        | false       |
| `client`         | String    | true     | false  | false       | true        |
| `date`           | String    | true     | false  | false       | false       |
| `items`          | Array     | true     | false  | false       | false       |
| `total`          | String    | true     | false  | false       | false       |
| `totalClient`    | Number    | true     | false  | false       | false       |


## ✋🏻 Autores
| <img src="https://avatars.githubusercontent.com/AntonioRdC" width=115> | <img src="https://avatars.githubusercontent.com/Bilbyc" width=115> | <img src="https://avatars.githubusercontent.com/devrafamenegon" width=115> | <img src="https://avatars.githubusercontent.com/renancarneiro" width=115> | <img src="https://avatars.githubusercontent.com/VitoriaStefany" width=115>
|---|---|---|---|---
| <a href="https://github.com/AntonioRdC">Antonio Carvalho</a> | <a href="https://github.com/Bilbyc">Carlos Bilby</a> | <a href="https://github.com/devrafamenegon">Rafael Menegon</a> | <a href="https://github.com/renancarneiro">Renan Costa</a> | <a href="https://github.com/VitoriaStefany">Vitoria Silva</a> 