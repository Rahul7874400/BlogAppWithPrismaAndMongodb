import {z} from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {prisma } from "../../prisma/index.js"
  


const generateToken = async (userId)=>{
    try {
        const user = await prisma.User.findUnique({
            where : {
                id : userId
            }
        })

        if(!user){
            console.log("Invalid User Id")
            return res
            .status(404)
            .json({
                succes : false,
                message : "Invalid User"
            })
        }

        const token =  jwt.sign(
            {
                id : user.id,
                email: user.email,
            },
            process.env.TOKEN_SCERET,
            {
                expiresIn: process.env.TOKEN_EXPIRE
            }
        )

        return {token}
        
    } catch (error) {
        console.log("Something went worng while generating the token")
        return res
        .status(404)
        .json({
            succes : false,
            message : "Something went worng while generating the token"
        })
    }
}

const signup = async (req,res)=>{
    try {
        const {email , name , password} = req.body
        const existingUser = await prisma.User.findUnique({
            where : {
                email : email
            }
        })

        if(existingUser){
            console.log("User with this email id already exist")
            return res
            .status(404)
            .json({
                success : false,
                message : "User already exist with this email id"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await prisma.User.create({
            data : {
                email,
                name,
                password : hashedPassword
            }
        })

        if(!newUser){
            console.log("Something went worng while registering the user")
            res
            .status(404)
            .json({
                success : false,
                message : "Something went worng while registering the user"
            })
        }

        return res
        .status(200)
        .json({
            success : true,
            message : "User Registered Successfully"
        })
    } catch (error) {
        console.log("Something went worng while signing up the user",error)
        return res
        .status(404)
        .json({
            succes : false,
            message : "Error in regisering the user"
        })
    }
}

const signin = async (req,res)=>{
    try {

        const {email , password} = req.body

        const existingUser = await prisma.User.findUnique({
            where : {
                email
            }
        })

        if(!existingUser){
            console.log("user with this email id does not exiat")
            return res
            .status(404)
            .json({
                succes : false,
                message : "User with this email id does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect){
            console.log("Incorrect password")
            return res
            .status(404)
            .json({
                succes : false,
                message : "Incorrect Password"
            })
        }

        const {token} = await generateToken(existingUser.id)

        //console.log("Token" , token)

        const options = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .cookie("token" , token , options)
        .json({
            succes : true,
            message : "User logged in succesfully"
        })
        
    } catch (error) {
        console.log("Something went worng while loging  the user",error)
        return res
        .status(404)
        .json({
            succes : false,
            message : "Error in loging the user"
        })
    }
}

const signout = async (req,res) =>{

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("token",options)
    .json({
        success : true,
        message : "Log Out successfully"
    })
}

const updateProfile = async (req,res)=>{
    try {
        const {name , email} = req.body

       // console.log("UserId : ",req.user?.id)

        const user = await prisma.User.update({
            where : {
                id : req.user.id
            },
            data : {
                email ,
                name 
            }
        })

        if(!user){
            return res
            .status(404)
            .json({
                success : false,
                message : "Something went while updating the profile"
            })
        }



        return res
        .status(200)
        .json({
            success : true,
            message : "Profile update successfully"
        })
        
    } catch (error) {
        console.log("Error in updating : ",error.message)
        return res
        .status(404)
        .json({
            success : false,
            message : error || "Something worng while updating the profile"
        })
    }
}


export {
    signup,
    signin,
    signout,
    updateProfile
}