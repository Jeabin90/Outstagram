import express from "express"
import { isAuth } from "../02_middleware/auth.js"
import * as commentController from "../03_controller/comments.js"

const router = express.Router()

<<<<<<< HEAD
// 댓글 생성은 POST /api/posts/:postId/comment

// 댓글 조회는 GET /api/posts/:postId/comments

=======
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
// 댓글 삭제
router.delete("/:commentId", isAuth, commentController.deleteComment)

export default router
