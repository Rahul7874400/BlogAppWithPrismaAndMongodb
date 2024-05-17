import {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config({
    path : './.env'
})

app.get('/' , (req , res)=>{
    res.send('Hii from Backend')
})

app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`Server is up running on port ${process.env.PORT}`)
})