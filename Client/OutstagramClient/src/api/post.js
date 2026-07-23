import apiFetch from "./apiClient"
import { useNavigate } from "react-router"



export async function fetchPost() {
  const navigate = useNavigate()

  try {
    const response = await apiFetch({ path: `/post/${postId}`, options: { method: "POST" } })

    if(!response.ok) {
      if(response.status === 404) {
        navigate("/404")
      }
      // 알림하거나 바로 보내주기
      navigate("/main")
    }

    const postdata = await response.json()

    if(postdata.success !== true) {
      navigate("/main")
    }

    return postData
  }
  catch (error) {
    navigate("/main")
  }
  // async function fetchPost() 종료
}

// 게시물 생성 API
export async function createPostApi(FormData) {
  return await apiFetch({
    path:"/posts",
    options: {
      method: "POST",
      body: FormData
    }
  })
}