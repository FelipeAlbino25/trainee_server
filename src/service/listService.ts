import listRepository from '../repository/listRepository';
import { ListDTOS, UpdateListDTOS, CreateListDTOS } from '../dtos/listDtos';
import { DuplicateError } from '../errors/DuplicateError';
import { NotFoundError } from '../errors/NotFoundError';

const listService = {
  async create({ name }: CreateListDTOS): Promise<CreateListDTOS> {
    const checkPreviousList = await listRepository.findByName(name);
    if (checkPreviousList != null) {
      throw new DuplicateError('there already exists a list with this name');
    }

    const newList = await listRepository.create({
      name,
    });

    return newList;
  },

  async list(): Promise<ListDTOS[]> {
    const lists = await listRepository.list();
    return lists;
  },
  async update({ id, name }: UpdateListDTOS): Promise<UpdateListDTOS> {
    const existingList = await listRepository.findById(id);

    if (existingList == null) {
      throw new NotFoundError('list was not found by this id');
    }

    const updatedList = await listRepository.update({
      id,
      name,
    });
    return updatedList;
  },
  async delete(id: string): Promise<void> {
    const existingList = await listRepository.findById(id);
    if (existingList == null) {
      throw new NotFoundError('a list was not found by this id');
    }

    await listRepository.delete(id);
  },
  async findById(id: string): Promise<ListDTOS> {
    const list = await listRepository.findById(id);

    if (list == null) {
      throw new NotFoundError('a list was not found by this id');
    }

    return list;
  },
  async findByName(name: string): Promise<ListDTOS> {
    const list = await listRepository.findByName(name);
    if (list == null) {
      throw new NotFoundError('a list was not found by this name');
    }
    return list;
  },
};

export default listService;
