import {z} from 'zod';

export const commentSchema = z.object({
  body: z.object({
    rating: z.number().min(0).max(5),
    comment: z.string().optional(),
    idUser: z.number(),
    idPlace: z.number(),
  })
})

export type CommentType = z.infer<typeof commentSchema>["body"];