import {z} from "zod"

export const signinSchemaValidator = z.object({
    email : z.string().email({message : "Invalid email"}),
    password : z.string().min(6 , {message : "password is atleast of 6 character"})
})
