import { Priority } from '@prisma/client';

export interface TaskDTOS {
  id: string;
  name: string;
  description?: string | null;
  priority: Priority;
  expectedFinishDate?: Date | null;
  listId: string;
  finished: boolean;
}

export interface CreateTaskDTOS {
  name: string;
  description?: string | null;
  priority: Priority;
  expectedFinishDate?: Date | null;
  listId: string;
  finished: boolean;
}

export interface UpdateTaskDTOS {
  id: string;
  name: string;
  description?: string | null;
  priority: Priority;
  expectedFinishDate?: Date | null;
  listId: string;
  finished: boolean;
}
