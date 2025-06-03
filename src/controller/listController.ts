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
    },
    async update(request: Request, response: Response){
        const { id } = request.params;
        const data = await listService.update({
            id,
            ...request.body
        } as UpdateListDTOS);

        response.status(200).json(data);
    },
    async delete(request: Request, response: Response){
        const { id } = request.params;
        const responseDelete = await listService.delete(id);

        if (responseDelete) {
            return response.status(200).json({ message: "List deleted successfully" });
        } else {
            return response.status(404).json({ message: "List not found" });
        }
    },
    async findById(request: Request, response: Response){
        const { id } = request.params;
        try {
            const data = await listService.findById(id);
            return response.status(200).json(data);
        } catch (error) {
            return response.status(404).json({ message: "List not found" });
        }
    },

}