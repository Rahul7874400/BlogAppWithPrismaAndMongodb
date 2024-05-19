import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(express.json({
    limit: "200kb"
}))
app.use(express.urlencoded({
    extended : true,
    limit : "200kb"
}))

app.use(cookieParser())

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.static('public'))


// router

import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)


export { app }
