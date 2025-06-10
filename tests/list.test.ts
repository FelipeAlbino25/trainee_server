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
  describe('POST api/v1/lists', async () => {
  
    const previousLists = await request(app).get('/api/v1/lists');
    
    for(let i=0; i<previousLists.body.length; i++){
      await request(app).delete(`/api/v1/lists/${previousLists.body[i].id}`);
    }
  
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
        .put(`/api/v1/lists/${updatedList.id}`).send(updatedList);
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