import { Router } from "express";
import taskController from '../controller/taskController';

const routes = Router();

routes.get('/',taskController.list);

routes.post('/',taskController.create);

routes.get('/:id',taskController.findById);

routes.put('/:id',taskController.update);

routes.delete('/:id',taskController.delete);

routes.get('/listId/:listId', taskController.findByListId);


export default routes; 