import * as bookmarkRepository from "../05_data/bookmarks.js"
<<<<<<< HEAD
=======
import * as postRepository from "../05_data/posts.js"
import bookmark from "../103_models/bookmark.js"
// import mongoose from "mongoose"
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f

/**
 * 사용자의 userId와 postId를 이용해서 true/false를 반환하는 함수
 */
export async function checkUserBookmarkPostById({ userId, postId }) {
    if (!userId || !postId) {
        return false
    }

    const bookmarkId = await bookmarkRepository.checkUserBookmarkPostById({ userId, postId })

    return !!bookmarkId
<<<<<<< HEAD
}
=======
}

// getMyBookmarks
export async function getMyBookmarks({ userId }) {
    return await bookmarkRepository.getMyBookmarks({ userId })
}

// createBookmark
export async function createBookmark({ userId, postId }) {
    const post = await postRepository.getById(postId)
    if (!post) { // if (!mongoose.isValidObjectId(postId))
        throw new Error("게시글을 찾을 수 없습니다")
    }

    const isBookmarked = await checkUserBookmarkPostById({ userId, postId })
    if(isBookmarked) {
        throw new Error("이미 북마크한 게시물")
    }

    return await bookmarkRepository.createBookmark({ userId, postId })
}

// deleteBookmark
export async function deleteBookmark({ userId, postId }) {
    const isBookmarked = await checkUserBookmarkPostById({ userId, postId })
    if(!isBookmarked) {
        throw new Error("북마크를 찾을 수 없습니다")
    }

    return await bookmarkRepository.deleteBookmark({ userId, postId })
}

>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
