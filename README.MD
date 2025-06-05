
# Projeto Trainee CATI.JR Backend

Repositório para armazenar a API do projeto de Trainee no Processo Seletivo da Empresa Jr. Cati.

Pré-requisitos: Node.js

## Variáveis de Ambiente

Para que o projeto possa ser rodado localmente em sua máquina, utilize o arquivo .env.example como base para criar as variáveis necessárias:

`DATABASE_URL`



## Como Executar


```bash
// 1. Clonar o repositório para uma pasta local
  >> git clone https://github.com/Pombo8/trainee_server

// 2. Entrar dentro da pasta principal do repositório
  >> cd trainee_server

// 3. Instalar as dependências
  >> npm install

// 4. Rodar as migrations do Prisma
  >> npx prisma migrate dev

// 5. Rodar a aplicação em modo de desenvolvedor
  >> npm run dev
```

    
## Testes da API

Foi utilizado a tecnologia Vitest para a criação dos testes unitários deste repositório.
Para rodar os testes digite no terminal:

```bash
  npm test
```


## Referências API

### Entidade: List
```
CreateListDTOS{
    name: string;
}

UpdateListDTOS{
    id: string;
    name:string;
}

ListDTOS{
    id: string;
    name: string;
    tasks: TaskDTOS[]
}
```
#### Listar todas as Listas

```http
  GET /api/v1/lists
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-------- |
| N/A | Array: ListDTOS [ ]  | 200 |

#### Criar uma Listar

```http
  POST /api/v1/lists
```

| Parâmetro | Resposta | Código de Status|
|:-------- | :---------| :- |
| req.Body -> Object: CreateListDTOS | Object: CreateListDTOS  | 201 |

#### Buscar Lista por id

```http
  GET /api/v1/lists/:id
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :- |
| req.Param -> String: id |Object: ListDTOS| 200 |

#### Atualizar uma Lista

```http
  PUT /api/v1/lists/:id
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-- |
| req.Param -> String: id | Object: UpdateListDTOS   | 200 |
| req.Body -> String: name| 

#### Excluir uma Lista

```http
  DELETE /api/v1/lists/:id
```

| Parâmetro | Resposta | Código de Status|
|:-------- | :---------| :-- |
| req.Param -> String | Boolean: True (deleted) / False (error) |200 |


### Entidade: Task

```
TaskDTOS {
    id: string;
    name: string;
    description?: string|null; 
    priority: Priority;
    expectedFinishDate?: Date|null;
    listId: string;
}

CreateTaskDTOS {
    name: string;
    description?: string|null;
    priority: Priority;
    expectedFinishDate?: Date|null;
    listId: string;
}

UpdateTaskDTOS {
    id: string;
    name: string;
    description?: string|null;
    priority: Priority;
    expectedFinishDate?: Date|null;
    listId: string;
}
``

#### Listar todas as Atividades

```http
  GET /api/v1/tasks
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-- |
| N/A | Array: TaskDTOS [ ]  | 200 |

#### Criar uma Atividade

```http
  POST /api/v1/tasks
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-|
| req.Body -> Object: CreateTaskDTOS     | Object: CreateTaskDTOS  | 201|


#### Buscar Atividade por id

```http
  GET /api/v1/tasks
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-|
| req.param -> String: id | Object: TaskDTOS | 200|


#### Atualizar uma Atividade

```http
  PUT /api/v1/tasks
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-- |
| req.Param -> String: id | Object: UpdateTaskDTOS  | 200 |
| req.Body -> UpdateTaskDTOS.attributes| 


#### Excluir uma Atividade

```http
  DELETE /api/v1/tasks
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-|
| req.Param -> String:id| Boolean: True (deleted) / False (error)  | 200|


#### Buscar Atividade por Lista.id

```http
  GET /api/v1/tasks/listId/:listId
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-|
|req.Param -> String: listId| Array: TaskDTOS[ ]  | 200|

#### Deletar Atividades por Lista.id

```http
  DELETE /api/v1/tasks/listId/:listId
```

| Parâmetro | Resposta | Código de Status |
|:-------- | :---------| :-|
|req.Param -> String: listId| Boolean: True(deleted) / False(error)  | 200|
