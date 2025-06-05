import {Router} from 'express'
import listController from '../controller/listController';
const routes = Router();

/*

      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      
*/
routes.get('/',listController.list);

/*
"post": {
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
routes.post('/',listController.create);


/*
"/lists/{id}": {
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
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
 */
routes.get('/:id',listController.findById);

/**
 * "put": {
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
 */

routes.put('/:id',listController.update);


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
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
 */
routes.delete('/:id',listController.delete);


export default routes;