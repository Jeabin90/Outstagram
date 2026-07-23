
import { useNavigate } from "react-router"
import { createPostApi } from "../api/post.js"
// import "./PostWitePage.css"
import { useState } from "react"

export default function PostWritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // 이미지 첨부
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    if (images.length + files.length > 3) {
      alert("이미지는 최대 3개까지 첨부할 수 있습니다")
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
  }

  // 이미지 삭제
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  // 게시물 게시
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      images.forEach((image) => {
        formData.append("images", image)
      })
      const response = await createPostApi(formData)

      if (response.ok) {
        alert("게시글이 등록되었습니다")
        navigate("/main")
      } else {
        alert("게시하지 못했습니다")
      }
    } catch (error) {
      console.error(error)
      alert("오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="write-page">
      <form onSubmit={handleSubmit} className="write-form">
        <input type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} className="title-input" />

        <hr className="divider" />

        <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} className="content-textarea" />

        {previews.length > 0 && (
          <div className="prview-container">
            {previews.map((url, idx) => (
              <div key={idx} className="preview-item">
                <img src={url} alt={`preview-${idx}`} />
                <button type="button" onClick={() => handleRemoveImage(idx)} className="remove-btn">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bottom-bar">
          <div className="left-btn">
            <button
              type="button"
              className="image-upload-btn"
              onClick={() => document.getElementById("file-upload").click()}
            >
              이미지 첨부
            </button>
            <input id="file-upload" type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: "none" }} disabled={images.length >= 3} />
          </div>

          <div className="right-btn">
            <button type="submit" disabled={loading} className="submit-btn">
              게시하기
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
