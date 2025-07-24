import { Request, Response } from 'express';
import listService from '../service/listService';
import { CreateListDTOS, UpdateListDTOS } from '../dtos/listDtos';
import {createListSchema, deleteListSchema, findListByIdSchema, findListByNameSchema, updateListSchema} from "../zod/list.schema"

class ListController {
  async list(req: Request, res: Response): Promise<void> {
    const data = await listService.list();
     res.status(200).json(data);
  }

  async create(req: Request, res: Response): Promise<void> {

    const {name} = createListSchema.shape.body.parse(req.body)
    const data = await listService.create({name} as CreateListDTOS)
    res.status(201).json(data)
    /*
        const existing = await listService.findByName(name);
        if (existing) {
             res.status(409).json({ error: "A list with that name already exists." });
        }

        const data = await listService.create({ name } as CreateListDTOS);
         res.status(201).json(data);

    } catch (error) {
      console.error("Error creating list:", error);
       res.status(500).json({ error: "Internal server error." });
    }
    */

  

  }

  async update(req: Request, res: Response): Promise<void> {


   const {name} = updateListSchema.shape.body.parse(req.body)
   const {id} =  updateListSchema.shape.params.parse(req.params)
   const data = await listService.update({id,name} as UpdateListDTOS)
   res.status(200).json(data);
   /* try {
      const { id } = req.params;
      const { name } = req.body;



      const existing = await listService.findById(id);
      if (!existing) {
         res.status(404).json({ msg: `List with id ${id} not found.` });
      }

      const updated = await listService.update({ id, name } as UpdateListDTOS);
       res.status(200).json(updated);

    } catch (error) {
      console.error("Error updating list:", error);
       res.status(500).json({ msg: 'Error updating list.' });
    }*/
  }

  async deleteById(req: Request, res: Response): Promise<void> {
   
    const {id} = deleteListSchema.shape.params.parse(req.params)
    const data = await listService.delete(id)
    res.status(200).json(data)
     /*
    try {
      const { id } = req.params;
      const existing = await listService.findById(id);

      if (!existing) {
         res.status(404).json({ msg: `List with id ${id} not found.` });
      }

      const result = await listService.delete(id);
       res.status(200).json(result);

    } catch (error) {
      console.error("Error deleting list:", error);
       res.status(500).json({ msg: "Error deleting list by id." });
    }
       */
  }

  async findById(req: Request, res: Response): Promise<void> {
    const {id} = findListByIdSchema.shape.params.parse(req.params)
    const data = await listService.findById(id)
    res.status(200).json(data)
    /*
    try {
      const data = await listService.findById(req.params.id);
      if (!data) {
         res.status(404).json({ message: "List not found." });
      }
       res.status(200).json(data);
    } catch (error) {
      console.error("Error finding list by ID:", error);
       res.status(500).json({ error: "Error finding list by ID." });
    }*/
  }

  async findByName(req: Request, res: Response): Promise<void> {
    
    const {name} = findListByNameSchema.shape.body.parse(req.body)
    const data = await listService.findByName(name)
    res.status(200).json(data)
    /*try {
      const { name } = req.params;


      const data = await listService.findByName(name);
      if (!data) {
         res.status(404).json({ msg: 'List not found.' });
      }

       res.status(200).json(data);
    } catch (error) {
      console.error("Error finding list by name:", error);
       res.status(500).json({ error: 'Error finding list by name.' });
    }
  
    */
  }
}

export default new ListController();
