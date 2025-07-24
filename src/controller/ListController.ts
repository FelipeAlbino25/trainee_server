import { Request, Response } from 'express'
import listService from '../service/listService'
import { CreateListDTOS, UpdateListDTOS } from '../dtos/listDtos'
import {
  createListSchema,
  deleteListSchema,
  findListByIdSchema,
  findListByNameSchema,
  updateListSchema,
} from '../zod/list.schema'

class ListController {
  async list(req: Request, res: Response): Promise<void> {
    const data = await listService.list()
    res.status(200).json(data)
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name } = createListSchema.shape.body.parse(req.body)
    const data = await listService.create({ name } as CreateListDTOS)
    res.status(201).json(data)
  }

  async update(req: Request, res: Response): Promise<void> {
    const { name } = updateListSchema.shape.body.parse(req.body)
    const { id } = updateListSchema.shape.params.parse(req.params)
    const data = await listService.update({ id, name } as UpdateListDTOS)
    res.status(200).json(data)
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    const { id } = deleteListSchema.shape.params.parse(req.params)
    const data = await listService.delete(id)
    res.status(200).json(data)
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = findListByIdSchema.shape.params.parse(req.params)
    const data = await listService.findById(id)
    res.status(200).json(data)
  }

  async findByName(req: Request, res: Response): Promise<void> {
    const { name } = findListByNameSchema.shape.body.parse(req.body)
    const data = await listService.findByName(name)
    res.status(200).json(data)
  }
}

export default new ListController()
