import { prisma } from "../../prisma/index.js";
import jwt from "jsonwebtoken"


const verifyJwt = async (req,res,next)=>{
    try {

    const token = req.cookies?.token
    if(!token){
        return res
        .status(404)
        .json({
            success : false,
            message : "Unauthorized user"
        })
    }

    const decodedToken = jwt.verify(token,process.env.TOKEN_SCERET)
    const user = await prisma.User.findUnique({
        where : {
            id : decodedToken.id
        }
    })

    if(!user){
        return res
        .status(404)
        .json({
            success : false,
            message : "Invalid user"
        })
    }

    user.password = undefined

    req.user = user

    next()
        
    } catch (error) {
        return res
        .status(404)
        .json({
            success : false,
            message : "Invalid Token"
        })
    }
}

export {
    verifyJwt
}