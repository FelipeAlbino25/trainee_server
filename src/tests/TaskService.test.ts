// src/tests/TaskService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import taskService from '../service/taskService';
import taskRepository from '../repository/taskRepository';
import listRepository from '../repository/listRepository';
import { NotFoundError } from '../errors/NotFoundError';
import { Priority } from '@prisma/client';

vi.mock('../repository/taskRepository');
vi.mock('../repository/listRepository');

const mockTask = {
  id: '1',
  name: 'Tarefa',
  description: 'desc',
  priority: Priority.LOW,
  expectedFinishDate: null,
  finished: false,
  listId: '1',
};

const mockList = {
  id: '1',
  name: 'Lista',
  tasks: [],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('taskService.create()', () => {
  it('cria uma nova task', async () => {
    (listRepository.findById as any).mockResolvedValue(mockList);
    (taskRepository.create as any).mockResolvedValue(mockTask);

    const result = await taskService.create(mockTask);
    expect(result).toEqual(mockTask);
  });

  it('lança erro se a lista não for encontrada', async () => {
    (listRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.create(mockTask)).rejects.toThrow(NotFoundError);
  });
});

describe('taskService.list()', () => {
  it('retorna todas as tasks', async () => {
    (taskRepository.list as any).mockResolvedValue([mockTask]);

    const result = await taskService.list();
    expect(result).toEqual([mockTask]);
  });
});

describe('taskService.update()', () => {
  it('atualiza uma task existente', async () => {
    (taskRepository.findById as any).mockResolvedValue(mockTask);
    (taskRepository.update as any).mockResolvedValue({ ...mockTask, name: 'Atualizada' });

    const result = await taskService.update({ ...mockTask, name: 'Atualizada' });
    expect(result.name).toBe('Atualizada');
  });

  it('lança erro se a task não for encontrada', async () => {
    (taskRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.update(mockTask)).rejects.toThrow(NotFoundError);
  });
});

describe('taskService.delete()', () => {
  it('deleta uma task existente', async () => {
    (taskRepository.findById as any).mockResolvedValue(mockTask);
    (taskRepository.delete as any).mockResolvedValue();

    const result = await taskService.delete('1');
    expect(result).toBeUndefined();
    expect(taskRepository.delete).toHaveBeenCalledWith('1');
  });

  it('lança erro se a task não for encontrada', async () => {
    (taskRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.delete('1')).rejects.toThrow(NotFoundError);
  });
});

describe('taskService.findByListId()', () => {
  it('retorna tasks por listId', async () => {
    (listRepository.findById as any).mockResolvedValue(mockList);
    (taskRepository.findByListId as any).mockResolvedValue([mockTask]);

    const result = await taskService.findByListId('1');
    expect(result).toEqual([mockTask]);
  });

  it('lança erro se a lista não existir', async () => {
    (listRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.findByListId('1')).rejects.toThrow(NotFoundError);
  });
});

describe('taskService.findById()', () => {
  it('retorna uma task por id', async () => {
    (taskRepository.findById as any).mockResolvedValue(mockTask);

    const result = await taskService.findById('1');
    expect(result).toEqual(mockTask);
  });

  it('lança erro se a task não existir', async () => {
    (taskRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.findById('1')).rejects.toThrow(NotFoundError);
  });
});

describe('taskService.deleteByListId()', () => {
  it('deleta todas as tasks de uma lista', async () => {
    (listRepository.findById as any).mockResolvedValue(mockList);
    (taskRepository.deleteByListId as any).mockResolvedValue();

    const result = await taskService.deleteByListId('1');
    expect(result).toBeUndefined();
    expect(taskRepository.deleteByListId).toHaveBeenCalledWith('1');
  });

  it('lança erro se a lista não for encontrada', async () => {
    (listRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.deleteByListId('1')).rejects.toThrow(NotFoundError);
  });
});

describe('taskService.updateTaskListId()', () => {
  it('atualiza o listId da task', async () => {
    (taskRepository.findById as any).mockResolvedValue(mockTask);
    (listRepository.findById as any).mockResolvedValue(mockList);
    (taskRepository.updateTaskListId as any).mockResolvedValue({ ...mockTask, listId: '2' });

    const result = await taskService.updateTaskListId('1', '2');
    expect(result.listId).toBe('2');
  });

  it('lança erro se a task ou lista não for encontrada', async () => {
    (taskRepository.findById as any).mockResolvedValue(null);

    await expect(taskService.updateTaskListId('1', '2')).rejects.toThrow(NotFoundError);
  });
});
