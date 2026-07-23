import express from "express"
import * as bookmarkController from "../03_controller/bookmarks"
import { isAuth } from "../02_middleware/auth"

const router = express.Router()

// 북마크 조회는 GET /api/users/me/bookmarks
router.get("/users/me/bookmarks", isAuth, bookmarkController.getMyBookmarks)

// 북마크 생성은 POST /api/posts/:postId/bookmarks
router.post("/posts/:postId/bookmarks", isAuth, bookmarkController.createBookmark)

// 북마크 삭제는 DELETE /api/posts/:postId/bookmarks
router.delete("/posts/:postId/bookmarks", isAuth, bookmarkController.deleteBookmark)

export default router
