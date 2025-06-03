import {Router} from 'express'
import listController from '../controller/listController';
const routes = Router();

routes.get('/',listController.list);

routes.post('/',listController.create);

routes.get('/:id',listController.findById);

routes.put('/:id',listController.update);

routes.delete('/:id',listController.delete);


export default routes;