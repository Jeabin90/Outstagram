import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate()

    const handleOut = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(!response.ok) {
                throw new Error("로그아웃 실패")
            }
        } catch (error) {
            console.error("로그아웃 에러: ", error)

        } finally {
            localStorage.removeItem("token")
            localStorage.removeItem("userid")

            alert("로그아웃")
            navigate("/login")
        }
    }


    return (
        <button type="button" className="logoutButton" onClick={handleOut}>
            로그아웃
        </button>
    )
}

export default Logout