// create comment
// delete comment
// update comment


import {prisma} from "../../prisma/index.js"


const createComment = async (req,res)=>{
    try {
        const {postId} = req.params
        const {comment} = req.body

        const createdComment = await prisma.comment.create({
            data : {
                comment,
                post : {connect : {id : postId}}
            }
        })

        if(!createdComment){
            return res
            .status(404)
            .json({
                success : false,
                message : "Something went worng while creating commenting"
            })
        }

        return res
        .status(202)
        .json({
            success : true,
            message : "Comment is posted successfully"
        })
        
    } catch (error) {
        console.log("Something went worng while creating commenting :",error)
        return res
        .status(404)
        .json({
            success : false,
            message : error.message || "Something went worng while creating commenting"
        })
    }
}

const deleteComment = async (req,res) =>{
    try {

        const {commentId} = req.params

        const deletedComment = await prisma.comment.delete({
            where : {
                id : commentId
            }
        })

        if(!commentId){
            return res
            .status(404)
            .json({
                success : false,
                message : error.message || "Something went worng while deleting commenting"
            })
        }

        return res
        .status(202)
        .json({
            success : true,
            message : "Comment deleted successfully"
        })
        
    } catch (error) {
        console.log("Something went worng while deleting commenting :",error)
        return res
        .status(404)
        .json({
            success : false,
            message : error.message || "Something went worng while deleting commenting"
        }) 
    }
}

const updateComment = async (req,res)=>{
    try {
        const {commentId} = req.params
        const {comment} = req.body

        const updatedComment = await prisma.comment.update({
            where : {
                id : commentId
            },
            data : {
                comment
            }
        })
        if(!updatedComment){
            return res
            .status(404)
            .json({
                success : false,
                message : error.message || "Something went worng while updating commenting"
            }) 
        }

        return res
        .status(202)
        .json({
            success : true,
            message : "Comment updated successfuly "
        })
    } catch (error) {
        console.log("Something went worng while updating commenting :",error)
        return res
        .status(404)
        .json({
            success : false,
            message : error.message || "Something went worng while updating commenting"
        }) 
    }
}

export {
    createComment,
    deleteComment,
    updateComment
}