<<<<<<< HEAD

// 
export async function getMyBookmarks(req, res) {
}


// 
export async function createBookmark(req, res) {
}


// 
export async function deleteBookmark(req, res) {
}
=======
import * as bookmarkService from "../04_service/bookmarks.js"

// getMyBookmarks
export async function getMyBookmarks(req, res) {
    try {
        const userId = req.userId;
        const bookmarks = await bookmarkService.getMyBookmarks({ userId });

        const posts = bookmarks
            .filter((b) => b.postId) 
            .map((b) => ({
            postId: b.postId._id,
            title: b.postId.title,
            authorLoginId: b.postId.authorUserid || "",
            viewCount: b.postId.viewCount || 0,
            createdAt: b.postId.createdAt,
            bookmarkedAt: b.createdAt
            }));

        return res.status(200).json({
            success: true,
            data: { posts }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "서버 오류 발생"
        });
    }
}


// createBookmark
export async function createBookmark(req, res) {
    try {
        const userId = req.userId
        const { postId } = req.params
        await bookmarkService.createBookmark({ userId, postId })

        return res.status(201).json({
            success: true,
            data: {
                postId: postId,
                bookmarked: true
            }
        })
    } catch (error) {
        if(error.message === "게시글을 찾을 수 없습니다") {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        if (error.message === "이미 북마크한 게시물") {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "서버 오류 발생"
        })
    }
}


// deleteBookmark
export async function deleteBookmark(req, res) {
    try {
        const userId = req.userId
        const { postId } = req.params
        await bookmarkService.deleteBookmark({ userId, postId })

        return res.status(204).send()
    } catch (error) {
        if (error.message === "북마크를 찾을 수 없습니다") {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "서버 오류 발생"
        })
    }
}

>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
