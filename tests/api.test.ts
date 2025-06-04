import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index' 

/*

LIST API TESTS

*/
describe('GET api/v1/lists', () => {
  it('GET /api/v1/lists should return 200 and array', async () => {
    const response = await request(app).get('/api/v1/lists');
  
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
describe('POST api/v1/lists', () => {
  it('POST /api/v1/lists should return 201 and created list', async () => {
    const newList = {
      name: 'Test List0001',
    };
    const response = await request(app)
      .post('/api/v1/lists').send(newList);
      console.log(response.body);
    expect(response.status).toBe(201);
  });
});

describe('PUT api/v1/lists/:id', () => {
  it('PUT /api/v1/lists/:id should return 200 and updated list', async () => {

    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'UpdateTestList0001' });

    const updatedList = {
      id: newList.body.id,
      name: 'Updated Test List',
    };
    const response = await request(app)
      .put(`/api/v1/lists/${newList.body.id}`).send(updatedList);
    expect(response.status).toBe(200);
  });
});

describe('DELETE api/v1/lists/:id', () => {
  it('DELETE /api/v1/lists/:id should return 200 and true', async () => {
    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'DeleteTestList0001' });

    const response = await request(app)
      .delete(`/api/v1/lists/${newList.body.id}`);
    expect(response.status).toBe(200);
    expect(response).toBeTruthy();
  });
})

describe('GET api/v1/lists/:id', () => {
  it('GET /api/v1/lists/:id should return 200 and foundList', async () => {
    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'FindByIdTestList0001' });

    const response = await request(app)
      .get(`/api/v1/lists/${newList.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(newList.body.id);
  })
});
/*

TASKS API TESTS

*/
describe('GET api/v1/tasks', () => {
  it('GET /api/v1/tasks should return 200 and array', async () => {
    const response = await request(app).get('/api/v1/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST api/v1/tasks', () => {
  it('POST /api/v1/tasks should return 201 and created task', async () => {
    const newList={
      name:"Test List for Task0001",
    }
    const listResponse = await request(app)
      .post('/api/v1/lists').send(newList);
    const newTask = {
      name: 'Test Task0001',
      description: 'This is a test task',
      priority: "MEDIUM",
      expectedFinishDate: new Date(),
      listId: listResponse.body.id, 
    };
    const response = await request(app)
      .post('/api/v1/tasks').send(newTask);
    expect(response.status).toBe(201);
  });
});

describe('PUT api/v1/tasks/:id', () => {

    it('PUT /api/v1/tasks/:id should return 200 and updated task', async () => {
    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'UpdateTestListForTask0001' });
    const newTask = await request(app)
      .post('/api/v1/tasks').send({
        name: 'UpdateTestTask0001',
        description: 'This is a test task',
        priority: "MEDIUM",
        expectedFinishDate: new Date(),
        listId: newList.body.id,
      });
    const updatedTask = {
      id: newTask.body.id,
      name: 'Updated Test Task',
      description: 'This is an updated test task',
      priority: "HIGH",
      expectedFinishDate: new Date(),
      listId: newList.body.id,
    };
    const response = await request(app)
      .put(`/api/v1/tasks/${newTask.body.id}`).send(updatedTask);
    expect(response.status).toBe(200);
  });
})

describe('DELETE api/v1/tasks/:id', () => {
  it('DELETE /api/v1/tasks/:id should return 200 and true', async () => {
    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'DeleteTestListForTask0001' });
    const newTask = await request(app)
      .post('/api/v1/tasks').send({
        name: 'DeleteTestTask0001',
        description: 'This is a test task',
        priority: "MEDIUM",
        expectedFinishDate: new Date(),
        listId: newList.body.id,
      });
    const response = await request(app)
      .delete(`/api/v1/tasks/${newTask.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
})

describe('GET api/v1/tasks/:id', () => {
  it('GET /api/v1/tasks/:id should return 200 and foundTask', async () => {
    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'FindByIdTestListForTask0001' });
    const newTask = await request(app)
      .post('/api/v1/tasks').send({
        name: 'FindByIdTestTask0001',
        description: 'This is a test task',
        priority: "MEDIUM",
        expectedFinishDate: new Date(),
        listId: newList.body.id,
      });
    const response = await request(app)
      .get(`/api/v1/tasks/${newTask.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(newTask.body.id);
  })
});

describe('GET api/v1/tasks/listId/:listId', () => {
  it('GET /api/v1/tasks/list/:listId should return 200 and tasks for list', async () => {
    const newList = await request(app)
      .post('/api/v1/lists').send({ name: 'FindByListIdTestListForTask0001' });
    const newTask = await request(app)
      .post('/api/v1/tasks').send({
        name: 'FindByListIdTestTask0001',
        description: 'This is a test task',
        priority: "MEDIUM",
        expectedFinishDate: new Date(),
        listId: newList.body.id,
      });
    const response = await request(app)
      .get(`/api/v1/tasks/listId/${newList.body.id}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  })
});
