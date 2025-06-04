import {Request, Response} from 'express';

import listService from '../service/listService';
import { CreateListDTOS, UpdateListDTOS } from '../dtos/listDtos';
import { beforeAll } from 'vitest';


export default{
    async list(request: Request, response: Response){
        const data = await listService.list();

        response.status(200).json(data);
    },
    async create(request: Request, response: Response){
        try{
        const data =await listService.create(request.body)
        
        response.status(201).json(data);
        }
        catch(error) {
            console.error("Error creating list:", error);
            response.status(500).json({ error: "Error creating list" });
        }
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
        try{
            const result = await listService.delete(request.params.id);
            response.status(200).json(result);
        }
        catch (error) {
            response.status(500).json({ error: "Error deleting list" });
        }
    },
    async findById(request: Request, response: Response){
        try{
            const data = await listService.findById(request.params.id);
            if (data) {
                response.status(200).json(data);
            }
            else {
                response.status(404).json({ message: "List not found" });
            }
        }
        catch(error){
            response.status(500).json({ error: "Error finding list by ID" });
        }
    },

}