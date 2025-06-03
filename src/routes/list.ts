import {Router} from 'express'
import listController from '../controller/listController';
const routes = Router();

routes.get('/',listController.list);

routes.post('/',listController.create);

export default routes;