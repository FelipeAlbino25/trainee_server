import {Request, Response} from 'express';

import listService from '../service/listService';
import { ListDTOS } from '../dtos/listDtos';
import { CreateListDTOS, UpdateListDTOS } from '../dtos/listDtos';



    const list = async(request: Request, response: Response):Promise<void>=>{
        const data = await listService.list();

        response.status(200).json(data);
    }
    const create = async(request: Request, response: Response): Promise<void>=> {
        try {
            const { name } = request.body;
    
            if (!name || typeof name !== 'string' || name.trim() === '') {
                response.status(400).json({
                    msg: "error creating list because name field was malformed",
                });
            }
    
            const data = await listService.create({ name } as CreateListDTOS);
    
            response.status(201).json(data);

        } catch (error: any) {
            console.error("Error creating list:", error);
            const {name} = request.body;
            const checkDuplicateList = listService.findByName(name);
            if (checkDuplicateList!=null) {
                response.status(409).json({
                    error: "A list with that name already exists.",
                });
            }
    
            response.status(500).json({
                error: "Internal server error. Please try again later.",
            });
        }
    }   
    const update = async(request: Request, response: Response):Promise<void>=>{
        try{
        const { id} = request.params;
        const {name} = request.body;
        const findListById = listService.findById(id);

        if(findListById==null){
            response.status(404).json({msg:"A list with this id:"+id+" was not found"})
        }
        if(name == null || typeof name !='string' || name.trim()==''){
            response.status(400).json({msg:"Name field from 'List' object was malformed"})
        }

        const data = await listService.update({
            id,
            name
        } as UpdateListDTOS);

        response.status(200).json(data);
        }
        catch(error){
            console.error("Error updating list:",error);      

            response.status(500).json({msg:'error updating list'})
        }
    }
    const deleteById = async(request: Request, response: Response):Promise<void>=>{
        try{

            const {id} = request.params;

            if(await listService.findById(id)==null){
                response.status(404).json({msg:"A List with this id:"+id+" was not found"})
            }

            const result = await listService.delete(id);
            response.status(200).json(result);
        }
        catch (error) {

            console.error("Error deleting List:",error);

            response.status(500).json({msg:"Error deleting list by id"})

           
        }
    }
    const findById = async(request: Request, response: Response):Promise<void>=>{
        try{
            const data = await listService.findById(request.params.id);
            if (data!=null) {
                response.status(200).json(data);
            }
            else {
                response.status(404).json({ message: "List not found" });
            }
        }
        catch(error){

            console.error("error finding list by id:",error);

            response.status(500).json({ error: "Error finding list by ID" });
        }
    }

    const findByName = async (request: Request, response: Response): Promise<void> =>{
        try{

            const {name} = request.params;
            if(name == null || typeof name !='string' ||  name.trim()==''){
                response.status(400).json({msg:'listName malformed'})
            }
            const data = await listService.findByName(name);
            if(data!=null){
                response.status(200).json(data);
            }
            else{
                response.status(404).json({msg:'list not found'})
            }
        }
        catch(error){
            console.error("error finding list by name :", error);
            response.status(500).json({error:'Error finding list by name'})
        }
    }

    const listController = {
        list,
        create,
        update,
        deleteById,
        findById,
        findByName
    }

    export default listController


