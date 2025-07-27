import { describe, it, expect, vi, beforeEach } from 'vitest';
import listService from '../service/listService';
import listRepository from '../repository/listRepository';
import { NotFoundError } from '../errors/NotFoundError';
import { DuplicateError } from '../errors/DuplicateError';

vi.mock('../repository/listRepository');

const mockLists = [
  {
    id: '1',
    name: 'Lista1',
    tasks: [
      {
        id: '1',
        name: 'task1',
        description: 'description1',
        priority: 'LOW',
        expectedFinishDate: null,
        finished: false,
        listId: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Lista2',
    tasks: [],
  },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe('listService.list()', () => {
  it('retorna lista de listas', async () => {
    (listRepository.list as unknown as any).mockResolvedValue(mockLists);

    const result = await listService.list();

    expect(result).toEqual(mockLists);
    expect(listRepository.list).toHaveBeenCalledTimes(1);
  });
});

describe('listService.create()', () => {
  it('retorna CreateListDTOS', async () => {
    const createListDTOS = { name: 'Lista3' };
    (listRepository.findByName as unknown as any).mockResolvedValue(null);
    (listRepository.create as unknown as any).mockResolvedValue(createListDTOS);

    const result = await listService.create(createListDTOS);

    expect(result).toEqual(createListDTOS);
    expect(listRepository.create).toHaveBeenCalledWith(createListDTOS);
  });

  it('lança erro se já existir lista com mesmo nome', async () => {
    (listRepository.findByName as unknown as any).mockResolvedValue(mockLists[0]);

    await expect(listService.create({ name: 'Lista1' })).rejects.toThrow(
      'there already exists a list with this name',
    );

    expect(listRepository.create).not.toHaveBeenCalled();
  });
});

describe('listService.update()', () => {
  it('retorna UpdateListDTOS', async () => {
    const updateListDTOS = { id: '2', name: 'Lista2' };
    const existingList = { id: '2', name: 'Antigo Nome', tasks: [] };

    (listRepository.findById as unknown as any).mockResolvedValue(existingList);
    (listRepository.update as unknown as any).mockResolvedValue(updateListDTOS);

    const result = await listService.update(updateListDTOS);

    expect(result).toEqual(updateListDTOS);
    expect(listRepository.findById).toHaveBeenCalledWith('2');
    expect(listRepository.update).toHaveBeenCalledWith(updateListDTOS);
  });

  it('lança erro se a lista não existir', async () => {
    (listRepository.findById as unknown as any).mockResolvedValue(null);

    await expect(listService.update({ id: '2', name: 'Lista2' })).rejects.toThrow(
      'list was not found by this id',
    );

    expect(listRepository.update).not.toHaveBeenCalled();
  });
});

describe('listService.delete()', () => {
  it('deleta a lista com sucesso', async () => {
    (listRepository.findById as unknown as any).mockResolvedValue(mockLists[1]);
    (listRepository.delete as unknown as any).mockResolvedValue(undefined);

    await expect(listService.delete('2')).resolves.toBeUndefined();
    expect(listRepository.delete).toHaveBeenCalledWith('2');
  });

  it('lança erro se a lista não existir', async () => {
    (listRepository.findById as unknown as any).mockResolvedValue(null);

    await expect(listService.delete('2')).rejects.toThrow('a list was not found by this id');

    expect(listRepository.delete).not.toHaveBeenCalled();
  });
});

describe('listService.findById()', () => {
  it('retorna a lista existente pelo id', async () => {
    (listRepository.findById as unknown as any).mockResolvedValue(mockLists[0]);

    const result = await listService.findById('1');

    expect(result).toEqual(mockLists[0]);
  });

  it('lança erro se a lista não existir', async () => {
    (listRepository.findById as unknown as any).mockResolvedValue(null);

    await expect(listService.findById('999')).rejects.toThrow('a list was not found by this id');
  });
});

describe('listService.findByName()', () => {
  it('retorna a lista existente pelo nome', async () => {
    (listRepository.findByName as unknown as any).mockResolvedValue(mockLists[1]);

    const result = await listService.findByName('Lista2');

    expect(result).toEqual(mockLists[1]);
  });

  it('lança erro se a lista não existir', async () => {
    (listRepository.findByName as unknown as any).mockResolvedValue(null);

    await expect(listService.findByName('Inexistente')).rejects.toThrow(
      'a list was not found by this name',
    );
  });
});
