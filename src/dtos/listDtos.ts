import { TaskDTOS } from './taskDtos';

export interface CreateListDTOS {
  name: string;
}

export interface UpdateListDTOS {
  id: string;
  name: string;
}

export interface ListDTOS {
  id: string;
  name: string;
  tasks: TaskDTOS[] | null;
}
