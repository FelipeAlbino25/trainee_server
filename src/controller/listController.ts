import {Request, Response} from 'express';

import listService from '../service/listService';
import { CreateListDTOS, UpdateListDTOS } from '../dtos/listDtos';

export default{
    async list(request: Request, response: Response){
        const data = await listService.list();

        response.status(200).json(data);
    },
    async create(request: Request, response: Response){
        const data =await listService.create(request.body)
        
        response.status(200).json(data);
    }
}