import {Router} from "express"
import { verifyJwt } from "../middleware/verifyJwt.js"
import {upload} from "../middleware/multer.js"
import { createPost, deletePost, getAllPost, getAllPostById, updatePost } from "../controllers/post.controller.js"
const router = Router()

router.route("/getAllPost").get(getAllPost)

router.use(verifyJwt)
router.route("/create").post(
    upload.fields([
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    createPost
)

router.route("/delete/:postId").delete(deletePost)
router.route("/update/:postId").patch(updatePost)
router.route("/getAllPostById").get(getAllPostById)






export default router

