import { z } from 'zod';
import { Priority } from '@prisma/client';

const idSchema = z.string().trim().min(1, 'id is required');

const nameSchema = z.string().trim().min(1, 'name is required');

const descriptionSchema = z.string().trim().nullable();

const prioritySchema = z.enum(Priority).default('MEDIUM');

const listIdSchema = z.string().trim().min(1, 'listId is required');

const finishedSchema = z.boolean();

const expectedFinishDateSchema = z
  .union([z.string(), z.date()])
  .optional()
  .transform((val) => (typeof val === 'string' ? new Date(val) : val))
  .nullable();

//create TaskController.ts
export const createTaskSchema = z.object({
  body: z.object({
    name: nameSchema,
    description: descriptionSchema,
    priority: prioritySchema,
    listId: listIdSchema,
    expectedFinishDate: expectedFinishDateSchema,
    finished: finishedSchema,
  }),
});

//update TaskController.ts
export const updateTaskSchema = z.object({
  body: z.object({
    name: nameSchema,
    description: descriptionSchema,
    priority: prioritySchema,
    listId: listIdSchema,
    expectedFinishDate: expectedFinishDateSchema,
    finished: finishedSchema,
  }),
  params: z.object({
    id: idSchema,
  }),
});

//deleteById TaskController.ts
export const deleteTaskSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});

//findByListId TaskController.ts
export const findTaskByListIdSchema = z.object({
  params: z.object({
    listId: listIdSchema,
  }),
});

//findById TaskController.ts
export const findTaskByIdSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});

//deleteByListId TaskController.ts
export const deleteTaskByListId = z.object({
  params: z.object({
    listId: listIdSchema,
  }),
});

//updateTaskListId TaskController.ts
export const updateTaskListIdSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    listId: listIdSchema,
  }),
});
