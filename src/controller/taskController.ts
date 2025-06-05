import {Request, Response} from 'express';
import taskService from '../service/taskService';
import { CreateTaskDTOS, UpdateTaskDTOS } from '../dtos/taskDtos';


    const list = async(request: Request, response: Response)=> {
        const data = await taskService.list();
        response.status(200).json(data);
    }

    const create = async(request: Request, response: Response) =>{
        try{
        const data = await taskService.create(request.body as CreateTaskDTOS);
        response.status(201).json(data);
        }
        catch(error) {
            response.status(500).json({ error: "Error creating task" });
        }
    }
    const update = async(request: Request, response: Response)=> {
        try{
            const { id } = request.params;
            const data = await taskService.update({
                id,
                ...request.body
            } as UpdateTaskDTOS);
            response.status(200).json(data);
        }
        catch(error) {
            response.status(500).json({ error: "Error updating task" });
        }
        
    }
    const deleteById = async(request: Request, response: Response) =>{
        try{
            const result = await taskService.delete(request.params.id);
            response.status(200).json(result);
        }
        catch (error) {
            response.status(500).json({ error: "Error deleting task" });
        }
    }
    const findByListId = async(request: Request, response: Response)=> {
        try{
            const result = await taskService.findByListId(request.params.listId);
            response.status(200).json(result);
        }
        catch(error){
            response.status(500).json({ error: "Error finding tasks by list ID" });
        }
    }
    const findById = async(request: Request, response: Response): Promise<void> =>{
        try {
            const result = await taskService.findById(request.params.id);
            response.status(200).json(result);
        } catch (error) {
            response.status(500).json({ error: "deu erro" });
        }
    }

    const deleteByListId = async(request: Request, response: Response): Promise<void> =>{
        try{
            const result = await taskService.deleteByListId(request.params.listId);
            response.status(200).json(result);
        }
        catch(err){
            console.error(err)
        }
    }

    const taskController = {
        list,
        create,
        update,
        delete: deleteById,
        findById,
        findByListId: findByListId,
        deleteByListId
    } 
    export default taskController;
