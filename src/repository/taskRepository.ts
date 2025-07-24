import { PrismaClient } from '@prisma/client'

import { TaskDTOS, CreateTaskDTOS, UpdateTaskDTOS } from '../dtos/taskDtos'

const client = new PrismaClient()

export default {
  async list(): Promise<TaskDTOS[]> {
    const response = await client.task.findMany()
    return response
  },
  async create(data: CreateTaskDTOS): Promise<CreateTaskDTOS> {
    const response = await client.task.create({ data })
    return response
  },
  async update(data: UpdateTaskDTOS): Promise<UpdateTaskDTOS> {
    const response = await client.task.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        priority: data.priority,
        expectedFinishDate: data.expectedFinishDate,
        listId: data.listId,
      },
    })
    return response
  },
  async delete(id: string): Promise<void> {
    await client.task.delete({ where: { id } })
  },

  async findByListId(listId: string): Promise<TaskDTOS[]> {
    const response = await client.task.findMany({
      where: { listId },
    })
    return response
  },
  async findById(id: string): Promise<TaskDTOS | null> {
    const response = await client.task.findUnique({
      where: { id },
    })
    return response
  },
  async deleteByListId(listId: string): Promise<void> {
    await client.task.deleteMany({ where: { listId } })
  },
  async updateTaskListId(id: string, listId: string): Promise<UpdateTaskDTOS> {
    const response = await client.task.update({
      where: { id: id },
      data: {
        listId: listId,
      },
    })
    return response
  },
}
