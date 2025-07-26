enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  priority: Priority;
  expectedFinishDate?: Date; // DateTime in Prisma corresponds to JS Date
  listId: string;
}
