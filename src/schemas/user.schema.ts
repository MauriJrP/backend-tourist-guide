import {z} from 'zod'

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Emal is required").email("Invalid email"),
    password: z.string().nonempty("Password is required").min(8, "Password too short"),
  }),
  params: z.object({
    idUser: z.string().nonempty(),
  })
})


export type updateUserType = z.infer<typeof updateUserSchema>["body"];
export type updateUserParamsType = z.infer<typeof updateUserSchema>["params"];