import Bookmark from "../103_models/bookmark.js";


/**
 * 해당 북마크가 있으면 bookmark._id 반환하는 함수
 *
 * 없으면 null
 */
export async function checkUserBookmarkPostById({ userId, postId }) {
    return await Bookmark.exists({ userId, postId })
}

<<<<<<< HEAD
=======
// 북마크 조회
export async function getMyBookmarks({ userId }) {
    return await Bookmark.find({ userId })
        .populate("postId")
        .sort({ createdAt: -1 })
}


// 북마크 생성
export async function createBookmark({ userId, postId }) {
    return await Bookmark.create({ userId, postId })
}

// 북마트 삭제
export async function deleteBookmark({ userId, postId }) {
    return await Bookmark.deleteOne({ userId, postId })
}

>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f

/**
 * postId를 통해 모든 북마크 삭제하기
 *
 * 삭제 결과를 true/false로 반환
 */
export async function deleteAllByPostId({ postId, session }) {
    return await Bookmark.deleteMany({ postId: postId }).session(session)
}