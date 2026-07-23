import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/users";

function EditProfilePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [userid, setUserid] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * 기존 회원정보 불러오기
     */
    useEffect(() => {
        async function getMyProfile() {
            try {
                const response = await fetch(`${API_URL}/me`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "회원정보 조회에 실패했습니다.");
                }

                setUserid(data.user.userid);

                setFormData({
                    name: data.user.name || "",
                    email: data.user.email || "",
                });
            } catch (error) {
                console.error(error);
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (!token) {
            navigate("/login");
            return;
        }

        getMyProfile();
    }, [navigate, token]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    /**
     * 회원정보 수정
     * PATCH /api/users/me
     */
    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.name.trim()) {
            setErrorMessage("이름을 입력해주세요.");
            return;
        }

        if (!formData.email.trim()) {
            setErrorMessage("이메일을 입력해주세요.");
            return;
        }

        try {
            setIsSaving(true);
            setErrorMessage("");

            const response = await fetch(`${API_URL}/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "회원정보 수정에 실패했습니다.");
            }

            alert(data.message || "회원정보가 수정되었습니다.");

            navigate("/mypage");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return <div className="edit-page-message">정보를 불러오는 중입니다.</div>;
    }

    return (
        <main className="edit-page">
            <section className="edit-card">
                <h1>내 정보 수정</h1>
                <p className="edit-description">
                    수정할 회원정보를 입력해주세요.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userid">아이디</label>
                        <input
                            id="userid"
                            type="text"
                            value={userid}
                            disabled
                        />
                        <small>아이디는 변경할 수 없습니다.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={30}
                            placeholder="이름을 입력해주세요."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일을 입력해주세요."
                        />
                    </div>

                    {errorMessage && (
                        <p className="edit-error-message">{errorMessage}</p>
                    )}

                    <div className="edit-button-group">
                        <button
                            type="button"
                            className="back-button"
                            onClick={() => navigate("/mypage")}
                            disabled={isSaving}
                        >
                            취소
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={isSaving}
                        >
                            {isSaving ? "저장 중..." : "수정 완료"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default EditProfilePage;