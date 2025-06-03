import {Request, Response} from 'express';
import taskService from '../service/taskService';
import { CreateTaskDTOS, UpdateTaskDTOS } from '../dtos/taskDtos';

export default {
    async list(request: Request, response: Response) {
        const data = await taskService.list();
        response.status(200).json(data);
    },

    async create(request: Request, response: Response) {
        const data = await taskService.create(request.body as CreateTaskDTOS);
        response.status(201).json(data);
    },
    async update(request: Request, response: Response) {
        const { id } = request.params;
        const data = await taskService.update({
            id,
            ...request.body
        } as UpdateTaskDTOS);
        response.status(200).json(data);
    },
    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const responseDelete = await taskService.delete(id);

        if (responseDelete) {
            return response.status(200).json({ message: "Task deleted successfully" });
        } else {
            return response.status(404).json({ message: "Task not found" });
        }
    },
    async findByListId(request: Request, response: Response) {
        const { listId } = request.params;
        try {
            const data = await taskService.findByListId(listId);
            return response.status(200).json(data);
        } catch (error) {
            return response.status(404).json({ message: "Tasks not found for this list" });
        }
    },
    async findById(request: Request, response: Response) {
        const { id } = request.params;
        try {
            const data = await taskService.findById(id);
            return response.status(200).json(data);
        } catch (error) {
            return response.status(404).json({ message: "Task not found" });
        }
    }   
};