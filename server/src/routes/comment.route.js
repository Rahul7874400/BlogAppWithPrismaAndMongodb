import {Router} from "express"
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller.js"

const router = Router()

router.route("/create/:postId").post(createComment)
router.route("/delete/:commentId").delete(deleteComment)
router.route("/update/:commentId").patch(updateComment)


export default router