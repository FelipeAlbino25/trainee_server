import {Request, Response} from 'express';
import taskService from '../service/taskService';
import { CreateTaskDTOS, UpdateTaskDTOS } from '../dtos/taskDtos';
import listService from '../service/listService';


    const list = async(request: Request, response: Response)=> {
        const data = await taskService.list();
        response.status(200).json(data);
    }

    const create = async(request: Request, response: Response) =>{
        try{
            const task= request.body as CreateTaskDTOS;

            if(
                task.listId==null
                || typeof task.listId !='string'
                || task.listId.trim()=='' 
                || task.name==null 
                || typeof task.name !='string'
                || task.name.trim()==''
            )
            {
                response.status(400).json({msg:"Create task failed because one of the entities fields was malformed"})
            }

            const list = await listService.findById(task.listId);
            if(list==null){
                response.status(404).json({msg:'list with the id:'+task.listId+" was not found"})
            }

            const data = await taskService.create(request.body as CreateTaskDTOS);
            response.status(201).json(data);
        }
        catch(error) {

            console.error("Error creating task:",error);

           
            response.status(500).json({msg:"Create task failed"})
        }
    }
    const update = async(request: Request, response: Response)=> {
        try{
            const { id } = request.params;

            const task = {
                id,
                ...request.body
            }

            if(id==null || typeof id !='string'|| id.trim()==''){
                response.status(400).json({msg:"Updating task failed because id was malformed"})
            }
            if(task.name==null|| task.listId ==null){
                response.status(400).json({msg:"Updating task failed because UpdateTaskDTOS fields were malformed"})
            }

            const data = await taskService.update(task as UpdateTaskDTOS);
            response.status(200).json(data);
        }
        catch(error) {
           
            console.error("Error updating task:",error)
            response.status(500).json({msg:'error updating task'})

        }
        
    }
    const deleteById = async(request: Request, response: Response) =>{
        try{
            const id = request.params.id;

            if(id==null || typeof id !='string'|| id.trim()==''){
                response.status(400).json({msg:'deleting task by id failed because id field was malformed'})
            }

            if(await taskService.findById(id)==null){
                response.status(404).json({msg:'deleting task by id failed because the task with id:'+id+" was not found"})
            }

            const result = await taskService.delete(request.params.id);
            response.status(200).json(result);
        }
        catch (error) {
            console.error('error deleting task by id:',error)
            response.status(500).json({ error: "Error deleting task" });
        }
    }
    const findByListId = async(request: Request, response: Response)=> {
        try{
            const listId = request.params.listId;
            if(listId==null || typeof listId !="string"|| listId.trim()==''){
                response.status(400).json({msg:'Find Task By ListId failed because ListId Param was malformed'})
            }
            if(await taskService.findByListId(listId)==null){
                response.status(404).json({msg:'Tasks not found'})
            }

            const result = await taskService.findByListId(listId);
            response.status(200).json(result);
        }
        catch(error){

            console.error("Find task by listId failed:",error);

            
            response.status(500).json({msg:'find task by listId failed'})
        }
    }
    const findById = async(request: Request, response: Response): Promise<void> =>{
        try {


            const id = request.params.id;

            if(id==null || typeof id !="string"|| id.trim()==''){
                response.status(400).json({msg:"find task by id failed because id field was malformed"})
            }

            if(await taskService.findById(id)==null){
                response.status(404).json({msg:'task not found'})
            }

            const result = await taskService.findById(id);
            response.status(200).json(result);
        } catch (error) {

            console.error('find task by id failed:',error)
            response.status(500).json({msg:'error finding task by id'})

        }
    }

    const deleteByListId = async(request: Request, response: Response): Promise<void> =>{
        try{

            const listId = request.params.listId;
            if(listId==null || typeof listId !='string'|| listId.trim()=='' ){
                response.status(400).json({msg:'deleting tasks by list id failed because listId field was malformed'})
            }

            const list = listService.findById(listId);
            if(list==null){
                response.status(404).json({msg:'deleting tasks by list id failed because the list with id:'+listId+" was not found"})
            }
            
            const result = await taskService.deleteByListId(request.params.listId);
            response.status(200).json(result);


            
        }
        catch(error){
            console.error(error)
            response.status(500).json({msg:'error deleting tasks by list id'})
        }
    }

    const taskController = {
        list,
        create,
        update,
        delete: deleteById,
        findById,
        findByListId: findByListId,
        deleteByListId
    } 
    export default taskController;
