import taskRepository from "../repository/taskRepository";

import { TaskDTOS, UpdateTaskDTOS, CreateTaskDTOS } from "../dtos/taskDtos";

export default {
    async create({ name, description,priority,expectedFinishDate, listId }: CreateTaskDTOS): Promise<CreateTaskDTOS> {
        const newTask = await taskRepository.create({
            name,
            description,
            priority,
            expectedFinishDate,
            listId
        }
    )


        return newTask;
    },

    async list(): Promise<TaskDTOS[]> {
        const tasks = await taskRepository.list();
        return tasks;
    },

    async update({ id, name, description, priority, expectedFinishDate, listId }: UpdateTaskDTOS): Promise<UpdateTaskDTOS> {
        const updatedTask = await taskRepository.update({
            id,
            name,
            description,
            priority,
            expectedFinishDate,
            listId
        });
        return updatedTask;
    },
    async delete(id: string): Promise<Boolean> {
        const response = await taskRepository.delete(id);
        return response;
    },
    async findByListId(listId: string): Promise<TaskDTOS[]> {
        const tasks = await taskRepository.findByListId(listId);
        return tasks;
    },
    async findById(id: string): Promise<TaskDTOS | null> {
        const task = await taskRepository.findById(id);
        if (task === null) {
            throw new Error("Task not found");
        }
        return task;
    },
    async deleteByListId(listId: string): Promise<Boolean>{
        try{
        const response = await taskRepository.deleteByListId(listId)
        return true;
        }
        catch(error){
            console.error(error)
            return false;
        }
    }
};