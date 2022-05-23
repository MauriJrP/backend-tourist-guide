import {z} from 'zod'

export const placeSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    address: z.string().nonempty("Address is required"),
    openingHours: z.string().nonempty("Opening hours is required").length(11, "Format: 00:00-00:00 is required"),
    phone: z.string().nonempty("Phone is required").length(10, "Phone 10 digits format").regex(/[0-9]{10}/, "Must be only numbers between 0 and 9"),
    manager: z.string().optional(),
    price: z.number().min(0),
    placeType: z.string().nonempty("Place type is required"),
    location: z.string().nonempty("Location is required"),
    description: z.string().nonempty("Description is required").max(500, "Must be less than 500 characters")
  })
})

export type PlaceType = z.infer<typeof placeSchema>["body"];
