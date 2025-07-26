import { describe, it, expect, vi, beforeEach } from 'vitest';
import listController from '../controller/ListController';
import listService from '../service/listService';

vi.mock('../service/listService');

const mockLists = [
  { id: '1', name: 'Lista 1' },
  { id: '2', name: 'Lista 2' },
];

let res: any;

beforeEach(() => {
  res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
});

describe('listController.list', () => {
  it('retorna status 200 com todas as listas', async () => {
    (listService.list as any).mockResolvedValue(mockLists);
    await listController.list({} as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLists);
  });
});

describe('listController.create', () => {
  it('retorna status 201 ao criar lista', async () => {
    const req = { body: { name: 'Nova Lista' } };
    const created = { id: '3', name: 'Nova Lista' };
    (listService.create as any).mockResolvedValue(created);
    await listController.create(req as any, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });
});

describe('listController.update', () => {
  it('retorna status 200 ao atualizar uma lista', async () => {
    const req = {
      body: { name: 'Atualizado' },
      params: { id: '1' },
    };
    const updated = { id: '1', name: 'Atualizado' };
    (listService.update as any).mockResolvedValue(updated);
    await listController.update(req as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});

describe('listController.deleteById', () => {
  it('retorna status 200 ao deletar lista', async () => {
    const req = { params: { id: '1' } };
    const deleted = { success: true };
    (listService.delete as any).mockResolvedValue(deleted);
    await listController.deleteById(req as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });
});

describe('listController.findById', () => {
  it('retorna status 200 com lista encontrada', async () => {
    const req = { params: { id: '1' } };
    (listService.findById as any).mockResolvedValue(mockLists[0]);
    await listController.findById(req as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLists[0]);
  });
});

describe('listController.findByName', () => {
  it('retorna status 200 com lista por nome', async () => {
    const req = { params: { name: 'Lista 1' } };
    (listService.findByName as any).mockResolvedValue(mockLists[0]);
    await listController.findByName(req as any, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockLists[0]);
  });
});
