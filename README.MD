

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

Foi utilizado a tecnologia Vitest para a criação dos testes end-to-end deste repositório.
Para rodar os testes digite no terminal:

```bash
// Dentro do projeto trainee_server/

// 1. Teste unitário da entidade List
    npx vitest run tests/list.test.ts

// 2. Teste unitário da entidade Task
    npx vitest run tests/task.test.ts
```


## Entidades

### List
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

```
## Referência da API
Com o servidor ativo, acesse `` http://localhost:3000/docs/`` através de seu navegador de escolha, os HTTP Requests estão todos disponíveis nesa página detalhadamente. Utilize, se necessário, as entidades disponibilizadas (DTOS) no README.md.
