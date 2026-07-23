import express from "express"
<<<<<<< HEAD
=======
import * as bookmarkController from "../03_controller/bookmarks.js"
import { isAuth } from "../02_middleware/auth.js"
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f

const router = express.Router()

// 북마크 조회는 GET /api/users/me/bookmarks
<<<<<<< HEAD

// 북마크 생성은 POST /api/posts/:postId/bookmarks

// 북마크 삭제는 DELETE /api/posts/:postId/bookmarks
=======
router.get("/users/me/bookmarks", isAuth, bookmarkController.getMyBookmarks)

// 북마크 생성은 POST /api/posts/:postId/bookmarks
router.post("/posts/:postId/bookmarks", isAuth, bookmarkController.createBookmark)

// 북마크 삭제는 DELETE /api/posts/:postId/bookmarks
router.delete("/posts/:postId/bookmarks", isAuth, bookmarkController.deleteBookmark)
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f

export default router
