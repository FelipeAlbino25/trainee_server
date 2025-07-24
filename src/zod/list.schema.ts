import { z } from 'zod'

const nameSchema = z.string().trim().min(1, 'name is required')
const idSchema = z.string().trim().min(1, 'id is required')

export const createListSchema = z.object({
  body: z.object({
    name: nameSchema,
  }),
})

export const updateListSchema = z.object({
  body: z.object({
    name: nameSchema,
  }),
  params: z.object({
    id: idSchema,
  }),
})

export const deleteListSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
})
export const findListByIdSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
})
export const findListByNameSchema = z.object({
  params: z.object({
    name: nameSchema,
  }),
})
