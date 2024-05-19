/// create post
// delete post
// update post
// get all post
// get all post by userId
import { prisma } from "../../prisma/index.js"
import {uploadOnCloud} from "../utils/cloudaniry.serices.js"


const createPost = async (req,res)=>{
    try {
        const {title , body , slug} = req.body

        const authorId = req.user?.id

        const coverImageLocalPath = req.files?.coverImage[0]?.path

        const coverImage = await uploadOnCloud(coverImageLocalPath)
        // if(!coverImage){
        //     return res
        //     .status(202)
        //     .json({
        //         success : false,
        //         message : "Something went worng while uploading the image on cloud"
        //     })
        // }

       const post = await prisma.post.create({
        data : {
            title,
            slug,
            body,
            coverImage : coverImage?.url || "",
            author : {connect : {id : authorId}}
        }
       })

       return res
       .status(202)
       .json({
        success : true,
        message : "Post created successfully"
       })
    } catch (error) {
        console.log("something went worng while creating the post : ",error)

        return res
        .status(404)
        .json({
            success : false,
            message : "something went worng while creating the post"
        })
    }
}

const deletePost = async (req,res)=>{
    try {
        const {postId} = req.params

        const deletedPost = await prisma.post.delete({
            where : {
                id : postId
            }
        })

        if(!deletePost){
            return res
            .status(404)
            .json({
                success : false,
                message : "Something went worng while deleting the post",
                data : deletedPost
            })
        }

        return res
        .status(202)
        .json({
            success : true,
            message : "Post deleted successfully"
        })
    } catch (error) {
        console.log("Something went worng while deleting the post")
        return res
        .status(404)
        .json({
            success : false,
            message : "Something went worng while deleting the post"
        })
    }
}

const updatePost = async (req,res)=>{
    try {
        const {postId} = req.params
        const {title , body} = req.body

        // console.log("title:", title)
        // console.log("body:",body)
        // console.log("postId :",postId)

        const updatedPost  = await prisma.post.update({
            where : {
                id : postId
            },
            data : {
                title,
                body
            }
        })

        if(!updatedPost){
            return res
            .status(404)
            .json({
                success : false,
                message : "Something worng while updating the post"
            })
        }

        return res
        .status(202)
        .json({
            success : true,
            message : "Post updated successfully"
        })
        
    } catch (error) {
        console.log("Something worng while updating the post")
        return res
        .status(404)
        .json({
            success : false,
            message : "Something worng while updating the post"
        })
    }
}

const getAllPost = async (req,res)=>{
    try {
        const posts = await prisma.post.findMany()
        if(!posts){
            return res
            .status(404)
            .json({
                success : false,
                message : "Something went worng while geeting the all post"
            })
        }
        return res
        .status(202)
        .json({
            success : true,
            message : "Get all post",
            data : posts
        })
    } catch (error) {
        console.log("Something went worng while geeting the all post")
        return res
        .status(404)
        .json({
            success : false,
            message : "Something went worng while geeting the all post"
        })
    }
}

const getAllPostById = async (req,res)=>{
    try {
        const posts = await prisma.post.findMany({
            where : {
                authorId : req.user?.id
            },
            include : {
                author : true
            }
        })

        if(!posts){
            return res
            .status(404)
            .json({
                success : false,
                message : "Something went worng while get the all post"
            })
        }

        return res
        .status(202)
        .json({
            success : true,
            message : "Get the all post of user",
            data : posts
        })
    } catch (error) {
        console.log("Something went worng while get the all post")
        return res
        .status(404)
        .json({
            success : false,
            message : "Something went worng while get the all post"
        })
    }
}

export {
    createPost,
    deletePost,
    updatePost,
    getAllPost,
    getAllPostById
}