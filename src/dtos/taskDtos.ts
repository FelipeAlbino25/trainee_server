import { Priority } from "@prisma/client";

export interface TaskDTOS{
    id:String;
    name:String;
    description:String;
    priority: Priority;
    expectedFinishDate: Date;
    listId: String;

}

export interface CreateTaskDTOS{
    name:String;
    description:String;
    priority: Priority;
    expectedFinishDate: Date;
    listId: String;
}
export interface UpdateTaskDTOS{
    name:String;
    description:String;
    priority: Priority;
    expectedFinishDate: Date;
    listId: String;
}