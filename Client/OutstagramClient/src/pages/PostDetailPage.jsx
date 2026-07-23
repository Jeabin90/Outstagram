import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import apiFetch from "../api/apiClient"
import { fetchPost } from "../api/post"

// [2026-07-23 09:00:40]
// 최초 렌더링 시에 할일들 []
  // 1. 포스트 정보 가져오기
  // 2. 내가 소유자인지 가져오기
  // 3. 댓글들 가져오기
// [본인일 경우] 글 수정/삭제 기능 넣기 []
  // 이미지 이미 만들어져 있는것 삭제 가능
  // 3개 이내로 다시 등록 가능
  // 제목/내용 수정 가능
  // 수정 후 다시 렌더링 해주기
// [누구나(로그인된사람)] 댓글 달기 (제한 없음) []
// [댓글 작성자 본인] 댓글 삭제하기 버튼 []

export default function PostDetailPage() {

  const [commentList, setCommentList] = useState([])
  const [post, setPost] = useState()
  const [isOwner, setIsOwner] = useState(false)
  const [postFetching, setPostFetching] = useState(true)
  const [commentsFetching, setCommentsFetching] = useState(true)
  const [bookmarked, setBookmarked] = useState(false)

  const { postId } = useParams()

  const navigate = useNavigate()

  // 최초 렌더링 시에 정보들 가져오기
  useEffect(() => {
    
    // 포스트 받아서 저장 및 권한 및 북마크 여부 확인해주기
    const postData = fetchPost()

    setPost(postData)

    if(postData.editable) {
      setIsOwner(true)
    }
    if(postData.bookmarked) {
      setBookmarked(true)
    }

    // 댓글 정보들 가져오기
    setCommentList()
  }, [postId])

  return (
    <>
      <h1>포스트 상세 페이지 및 수정</h1>
    </>
  )
}
