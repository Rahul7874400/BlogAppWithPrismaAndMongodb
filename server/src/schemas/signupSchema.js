import {z} from "zod"

export const namevalidator = z
.string()
.min(2 , "user name atleast of 2 character")
.max(20 , "user name size atmost of 20 character")


export const signupSchemaValidator = z.object({
    name : namevalidator,
    email : z.string().email({message : "Invalid email"}),
    password : z.string().min(6 , {message : "password is atleast of 6 character"})
})