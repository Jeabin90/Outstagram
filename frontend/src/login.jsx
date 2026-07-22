import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"


const LOGIN_API_URL = "http://localhost:8080/api/auth/login"


// 로그인
function Login() {
    const [userid, setUserid] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!userid.trim() || !password.trim()) {
            setError("아이디와 비밀번호를 입력해주세요")
            return
        }

        try {
            setLoading(true)
            setError("")

            const response = await fetch(LOGIN_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userid, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "로그인에 실패했습니다")
            }

            // 토큰 저장, 메인 페이지 이동 
            localStorage.setItem("token", data.token)
            localStorage.setItem("userid", data.user.id)
            alert("로그인 성공")
            navigate("/main")
        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    // 회원가입 작성
    const signupClick = () => {
        navigate("/signup")
    }



    return (
        <main className="container">
            <h1 style={{ fontSize: "2.5rem", marginBottom: "30px" }}><strong>Outstargram</strong></h1>

            {/* 아이디 비밀번호 입력창 */}
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <input id="userid" type="text" placeholder="아이디를 입력하세요" value={userid}
                        onChange={(e) => setUserid(e.target.value)} />
                </div>
                <div>
                    <input id="password" type="password" placeholder="비밀번호를 입력하세요" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* 로그인, 회원가입 버튼 */}
                <div className="buttons" style={{}}>
                    <button type="submit" disabled={loading}>{loading ? "로그인 중..." : "로그인"}</button>
                    <button type="button" className="signupButton" onClick={signupClick} >회원가입</button>
                </div>
            </form>

            {error && <p className="error-message">{error}</p>}

        </main>
    )
}

export default Login