import taskRepository from '../repository/taskRepository';

import { TaskDTOS, UpdateTaskDTOS, CreateTaskDTOS } from '../dtos/taskDtos';
import listRepository from '../repository/listRepository';
import { NotFoundError } from '../errors/NotFoundError';

export default {
  async create({
    name,
    description,
    priority,
    expectedFinishDate,
    listId,
    finished,
  }: CreateTaskDTOS): Promise<CreateTaskDTOS> {
    const existingList = await listRepository.findById(listId);
    if (existingList == null) {
      throw new NotFoundError('a list was not found by this listId during task creation');
    }

    const newTask = await taskRepository.create({
      name,
      description,
      priority,
      expectedFinishDate,
      listId,
      finished,
    });

    return newTask;
  },

  async list(): Promise<TaskDTOS[]> {
    const tasks = await taskRepository.list();
    return tasks;
  },

  async update({
    id,
    name,
    description,
    priority,
    expectedFinishDate,
    listId,
    finished,
  }: UpdateTaskDTOS): Promise<UpdateTaskDTOS> {
    const existingTask = await taskRepository.findById(id);
    if (existingTask == null) {
      throw new NotFoundError('a task with this id was not found during task update method');
    }

    const updatedTask = await taskRepository.update({
      id,
      name,
      description,
      priority,
      expectedFinishDate,
      listId,
      finished,
    });
    return updatedTask;
  },
  async delete(id: string): Promise<void> {
    const existingTask = taskRepository.findById(id);
    if (existingTask == null) {
      throw new NotFoundError('a task was not found with this id during task delete method');
    }

    await taskRepository.delete(id);
  },
  async findByListId(listId: string): Promise<TaskDTOS[]> {
    const existingList = await listRepository.findById(listId);
    if (existingList == null) {
      throw new NotFoundError(
        'a list was not found with this listId during findTaskByListId method',
      );
    }

    const tasks = await taskRepository.findByListId(listId);
    return tasks;
  },
  async findById(id: string): Promise<TaskDTOS> {
    const task = await taskRepository.findById(id);
    if (task == null) {
      throw new NotFoundError('a task was not found with this id during findTaskById method');
    }
    return task;
  },
  async deleteByListId(listId: string): Promise<void> {
    const existingList = await listRepository.findById(listId);
    if (existingList == null) {
      throw new NotFoundError(
        'a list was not found with this listId during deleteTasksByListId method',
      );
    }
    await taskRepository.deleteByListId(listId);
  },
  async updateTaskListId(id: string, listId: string): Promise<UpdateTaskDTOS> {
    const existingTask = await taskRepository.findById(id);
    const existingList = await listRepository.findById(listId);

    if (existingTask == null || existingList == null) {
      throw new NotFoundError(
        'either task or list were not found by the specifiedId during updateTaskListId',
      );
    }
    const response = await taskRepository.updateTaskListId(id, listId);
    return response;
  },
};
