import { Router } from "express";
import taskController from '../controller/taskController';

const routes = Router();


/**
 * "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
 */
routes.get('/',taskController.list);

/**
 * "post": {
        "description": "",
        "responses": {
          "201": {
            "description": "Created"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
 */
routes.post('/',taskController.create);

/**
 * "/tasks/{id}": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
 */
routes.get('/:id',taskController.findById);


/**
 * "put": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
 */
routes.put('/:id',taskController.update);

/**
 * "delete": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "default": {
            "description": ""
          }
        }
      }
 */
routes.delete('/:id',taskController.delete);


/**
 * "/tasks/listId/{listId}": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "listId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }, 
    }
 */
routes.get('/listId/:listId', taskController.findByListId);

/**
 * 
 * "/tasks/listId/{listId}": {
      "delete": {
        "description": "",
        "parameters": [
          {
            "name": "listId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
 */

routes.delete('/listId/:listId',taskController.deleteByListId)


export default routes; 