import { List, PrismaClient } from '@prisma/client';

import { ListDTOS, UpdateListDTOS, CreateListDTOS } from '../dtos/listDtos';

const client = new PrismaClient();

export default {
  async list(): Promise<ListDTOS[]> {
    const response = await client.list.findMany({
      include: {
        tasks: true,
      },
    });

    return response;
  },

  async findById(id: string): Promise<ListDTOS | null> {
    const response = await client.list.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
    return response;
  },
  async create(data: CreateListDTOS): Promise<CreateListDTOS> {
    const response = await client.list.create({
      data,
    });

    return response;
  },
  async update(data: UpdateListDTOS): Promise<UpdateListDTOS> {
    const response = await client.list.update({
      where: { id: data.id },
      data: {
        name: data.name,
      },
    });
    return response;
  },
  async delete(id: string): Promise<void> {
    await client.task.deleteMany({ where: { listId: id } });
    await client.list.delete({ where: { id: id } });
  },
  async findByName(name: string): Promise<ListDTOS | null> {
    const response = await client.list.findUnique({
      where: { name: name },
      include: {
        tasks: true,
      },
    });
    return response;
  },
};
