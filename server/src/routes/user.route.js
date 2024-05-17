import {Router} from "express"
import { signin, signout, signup, updateProfile } from "../controllers/user.controller.js"
import { verifyJwt } from "../middleware/verifyJwt.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/signout").get(signout)
router.route("/update").patch(verifyJwt , updateProfile)

export default router