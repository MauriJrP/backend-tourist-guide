import {z} from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z.string().nonempty("Emal is required").email("Invalid email"),
    password: z.string().nonempty("Password is required").min(8, "Password too short"),
  })
})

export const signupSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().nonempty("Password is required").min(8, "Password too short"),
    gender: z.string().length(1),
    age: z.number().positive().gte(18, "Must be over 18 years old"),
  })
})

export type LoginType = z.infer<typeof loginSchema>["body"];
export type SignupType = z.infer<typeof signupSchema>["body"];