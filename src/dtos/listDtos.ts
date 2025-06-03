import {TaskDTOS}from "./taskDtos"

export interface CreateListDTOS{
    name: string;
}

export interface UpdateListDTOS{
    name:string;
}

export interface ListDTOS{
    id: string;
    name: string;
    tasks: TaskDTOS[]
}