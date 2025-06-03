import { Priority } from "@prisma/client";

export interface TaskDTOS {
    id: string;
    name: string;
    description: string;
    priority: Priority;
    expectedFinishDate: Date;
    listId: string;
}

export interface CreateTaskDTOS {
    name: string;
    description: string;
    priority: Priority;
    expectedFinishDate: Date;
    listId: string;
}

export interface UpdateTaskDTOS {
    id: string;
    name: string;
    description: string;
    priority: Priority;
    expectedFinishDate: Date;
    listId: string;
}
