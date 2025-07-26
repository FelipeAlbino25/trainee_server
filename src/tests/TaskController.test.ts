import { describe, it, expect, vi } from 'vitest';
import taskController from '../controller/TaskController';
import taskService from '../service/taskService';

vi.mock('../service/taskService');

const mockTasks = [
  {
    id: '1',
    name: 'task1',
    description: 'description1',
    priority: 'LOW',
    expectedFinishDate: null,
    finished: false,
    listId: '1',
  },
  {
    id: '2',
    name: 'task2',
    description: 'description2',
    priority: 'MEDIUM',
    expectedFinishDate: null,
    finished: true,
    listId: '2',
  },
];

const createTaskDto = {
  name: mockTasks[1].name,
  description: mockTasks[1].description,
  priority: mockTasks[1].priority,
  expectedFinishDate: mockTasks[1].expectedFinishDate,
  listId: mockTasks[1].listId,
  finished: mockTasks[1].finished,
};

const updateTaskDto = {
  id: mockTasks[1].id,
  name: mockTasks[1].name,
  description: mockTasks[1].description,
  priority: mockTasks[1].priority,
  expectedFinishDate: mockTasks[1].expectedFinishDate,
  finished: mockTasks[1].finished,
  listId: mockTasks[1].listId,
};

// list()
describe('taskController.list()', () => {
  it('retorna status 200 com lista de tasks', async () => {
    (taskService.list as any).mockResolvedValue(mockTasks);

    const req = {} as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.list(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks);
  });
});

// findById()
describe('taskController.findById()', () => {
  it('retorna status 200 com uma task', async () => {
    (taskService.findById as any).mockResolvedValue(mockTasks[1]);

    const req = { params: { id: mockTasks[1].id } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTasks[1]);
  });
});

// create()
describe('taskController.create()', () => {
  it('retorna status 201 com CreateTaskDTO', async () => {
    (taskService.create as any).mockResolvedValue(createTaskDto);

    const req = { body: createTaskDto } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createTaskDto);
  });
});

// update()
describe('taskController.update()', () => {
  it('retorna status 200 com UpdateTaskDTO', async () => {
    (taskService.update as any).mockResolvedValue(updateTaskDto);

    const req = {
      params: { id: updateTaskDto.id },
      body: {
        name: updateTaskDto.name,
        description: updateTaskDto.description,
        priority: updateTaskDto.priority,
        listId: updateTaskDto.listId,
        expectedFinishDate: updateTaskDto.expectedFinishDate,
        finished: updateTaskDto.finished,
      },
    } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updateTaskDto);
  });
});

// deleteById()
describe('taskController.deleteById()', () => {
  it('retorna status 200', async () => {
    const id = mockTasks[0].id;
    (taskService.delete as any).mockResolvedValue(undefined);

    const req = { params: { id } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.deleteById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(undefined);
  });
});

// findByListId()
describe('taskController.findByListId()', () => {
  it('retorna status 200 com tasks da lista', async () => {
    const listId = mockTasks[1].listId;
    const expected = [mockTasks[1]];

    (taskService.findByListId as any).mockResolvedValue(expected);

    const req = { params: { listId } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.findByListId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
});

// deleteByListId()
describe('taskController.deleteByListId()', () => {
  it('retorna status 200 apos deletar todas as tasks de uma lista', async () => {
    const listId = mockTasks[1].listId;

    (taskService.deleteByListId as any).mockResolvedValue(undefined);

    const req = { params: { listId } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.deleteByListId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(undefined);
  });
});

// updateTaskListId()
describe('taskController.updateTaskListId()', () => {
  it('retorna status 200 com task atualizada com novo listId', async () => {
    const taskId = mockTasks[0].id;
    const newListId = '3';
    const updatedTask = { ...mockTasks[0], listId: newListId };

    (taskService.updateTaskListId as any).mockResolvedValue(updatedTask);

    const req = {
      params: { id: taskId },
      body: { listId: newListId },
    } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;

    await taskController.updateTaskListId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedTask);
  });
});
