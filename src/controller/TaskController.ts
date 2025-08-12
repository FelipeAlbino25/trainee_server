import { Request, Response } from 'express';
import taskService from '../service/taskService';
import {
  createTaskSchema,
  deleteTaskByListId,
  deleteTaskSchema,
  findTaskByIdSchema,
  findTaskByListIdSchema,
  updateTaskListIdSchema,
  updateTaskSchema,
} from '../zod/task.schema';
import { CreateTaskDTOS, UpdateTaskDTOS } from '../dtos/taskDtos';

class TaskController {
  async list(req: Request, res: Response): Promise<void> {
    const data = await taskService.list();
    res.status(200).json(data);
  }

  async create(req: Request, res: Response): Promise<void> {
    const createTaskDTOS = createTaskSchema.shape.body.parse(req.body) as CreateTaskDTOS;
    const data = await taskService.create(createTaskDTOS);
    res.status(201).json(data);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { name, description, priority, listId, expectedFinishDate, finished } =
      updateTaskSchema.shape.body.parse(req.body);
    const { id } = updateTaskSchema.shape.params.parse(req.params);

    const updateTaskDTOS = {
      name: name,
      description: description,
      priority: priority,
      listId: listId,
      expectedFinishDate: expectedFinishDate,
      id: id,
      finished: finished,
    } as UpdateTaskDTOS;
    const data = await taskService.update(updateTaskDTOS);
    res.status(200).json(data);
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    const { id } = deleteTaskSchema.shape.params.parse(req.params);
    const data = await taskService.delete(id);
    res.status(200).json(data);
  }

  async findByListId(req: Request, res: Response): Promise<void> {
    const { listId } = findTaskByListIdSchema.shape.params.parse(req.params);

    const data = await taskService.findByListId(listId);
    res.status(200).json(data);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = findTaskByIdSchema.shape.params.parse(req.params);

    const data = await taskService.findById(id);
    res.status(200).json(data);
  }

  async deleteByListId(req: Request, res: Response): Promise<void> {
    const { listId } = deleteTaskByListId.shape.params.parse(req.params);
    const data = await taskService.deleteByListId(listId);
    res.status(200).json(data);
  }

  async updateTaskListId(req: Request, res: Response): Promise<void> {
    const { id } = updateTaskListIdSchema.shape.params.parse(req.params);
    const { listId } = updateTaskListIdSchema.shape.body.parse(req.body);

    const data = await taskService.updateTaskListId(id, listId);
    res.status(200).json(data);
  }
}

export default new TaskController();
