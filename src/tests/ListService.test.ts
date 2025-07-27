import { describe, it, expect, vi, beforeEach } from 'vitest';
import listService from '../service/listService';
import listRepository from '../repository/listRepository';

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

describe('listService.list()', () => {
  it('retorna lista de listas', async () => {
    (listRepository.list as any).mockResolvedValue(mockLists);

    const result = await listService.list();
    expect(result).toHaveBeenCalledWith(mockLists);
  });
});
