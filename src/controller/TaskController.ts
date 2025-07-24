import { Request, Response } from 'express';
import taskService from '../service/taskService';
import listService from '../service/listService';
import { CreateTaskDTOS, UpdateTaskDTOS } from '../dtos/taskDtos';
import {createTaskSchema, deleteTaskByListId, deleteTaskSchema, findTaskByIdSchema, findTaskByListIdSchema, updateTaskListIdSchema, updateTaskSchema} from "../zod/task.schema"

class TaskController {
    
    async list(req: Request, res: Response): Promise<void> {
        const data = await taskService.list();
        res.status(200).json(data);
    };

    async create(req: Request, res: Response): Promise<void> {
        const CreateTaskDTOS = createTaskSchema.shape.body.parse(req.body)
        const data = await taskService.create(CreateTaskDTOS)
        res.status(201).json(data)
        
        /*
        try {
        const task = req.body as CreateTaskDTOS;
      

        const list = await listService.findById(task.listId);
        if (!list) {
            res.status(404).json({ msg: `List with id ${task.listId} not found.` });
        }

        const data = await taskService.create(task);
        res.status(201).json(data);
        } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ msg: "Internal server error while creating task." });
        }
        */
    };

    async update(req: Request, res: Response): Promise<void> {
        const {name,description,priority,listId,expectedFinishDate} = updateTaskSchema.shape.body.parse(req.body);
        const {id} = updateTaskSchema.shape.params.parse(req.params);

        const UpdateTaskDTOS = {
            name:name,
            description:description,
            priority:priority,
            listId:listId,
            expectedFinishDate:expectedFinishDate,
            id:id
        }

        const data = await taskService.update(UpdateTaskDTOS)
        res.status(200).json(data)
        
        /*
        try {
        const { id } = req.params;
        const { name, listId, priority, description, expectedFinishDate } = req.body;

  
        if (!name || typeof name !== 'string' || name.trim() === '' ||
            !listId || typeof listId !== 'string' || listId.trim() === '' ||
            priority === undefined) {
            res.status(400).json({ msg: "Malformed 'name', 'listId', or 'priority' in body." });
        }

        const data = await taskService.update({
            id,
            name,
            listId,
            priority,
            description: description ?? null,
            expectedFinishDate: expectedFinishDate ?? null
        });
        res.status(200).json(data);
        } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ msg: 'Internal server error while updating task.' });
        }
        */
    };

    async deleteById(req: Request, res: Response): Promise<void> {
        
        const {id} = deleteTaskSchema.shape.params.parse(req.params)
        const data = await taskService.delete(id)
        res.status(200).json(data)
        /*
        try {
        const { id } = req.params;


        const existing = await taskService.findById(id);
        if (!existing) {
            res.status(404).json({ msg: `Task with ID ${id} not found.` });
        }

        const result = await taskService.delete(id);
        res.status(200).json(result);
        } catch (error) {
        console.error('Error deleting task by ID:', error);
        res.status(500).json({ error: "Internal server error while deleting task." });
        }
        */
    };

    async findByListId(req: Request, res: Response): Promise<void> {
        const {listId} = findTaskByListIdSchema.shape.params.parse(req.params)

        const data = await taskService.findByListId(listId);
        res.status(200).json(data)
        /*
        try {
        const { listId } = req.params;

        const result = await taskService.findByListId(listId);
        if (!result || result.length === 0) {
            res.status(404).json({ msg: 'No tasks found for this list.' });
        }

        res.status(200).json(result);
        } catch (error) {
        console.error("Error finding tasks by listId:", error);
        res.status(500).json({ msg: 'Internal server error while finding tasks by listId.' });
        }
        */
    };

    async findById(req: Request, res: Response): Promise<void> {
        const {id} = findTaskByIdSchema.shape.params.parse(req.params);

        const data = await taskService.findById(id)
        res.status(200).json(data);
        /*
        try {
        const { id } = req.params;


        const result = await taskService.findById(id);
        if (!result) {
            res.status(404).json({ msg: 'Task not found.' });
        }

        res.status(200).json(result);
        } catch (error) {
        console.error('Error finding task by ID:', error);
        res.status(500).json({ msg: 'Internal server error while finding task by ID.' });
        }
        */
    };

    async deleteByListId(req: Request, res: Response): Promise<void> {
        const {listId} = deleteTaskByListId.shape.params.parse(req.params);
        const data = await taskService.deleteByListId(listId)
        res.status(200).json(data)
        
        /*
        try {
        const { listId } = req.params;

        const list = await listService.findById(listId);
        if (!list) {
            res.status(404).json({ msg: `List with ID ${listId} not found.` });
        }

        const result = await taskService.deleteByListId(listId);
        res.status(200).json(result);
        } catch (error) {
        console.error("Error deleting tasks by listId:", error);
        res.status(500).json({ msg: 'Internal server error while deleting tasks by listId.' });
        }
        */
    };

    async updateTaskListId(req: Request, res: Response): Promise<void>  {
        const {id} = updateTaskListIdSchema.shape.params.parse(req.params)
        const {listId} = updateTaskListIdSchema.shape.body.parse(req.body)

        const data = await taskService.updateTaskListId(id,listId);
        res.status(200).json(data)
        
        /*
        try {
        const { id } = req.params;
        const { listId } = req.body;

  

        const newList = await listService.findById(listId);
        if (!newList) {
            res.status(404).json({ msg: "Target list not found." });
        }

        const result = await taskService.updateTaskListId(id, listId);
        res.status(200).json(result);
        } catch (error) {
        console.error("Error updating task's listId:", error);
        res.status(500).json({ msg: 'Internal server error while moving task.' });
        }
        */
    };
}

export default new TaskController();