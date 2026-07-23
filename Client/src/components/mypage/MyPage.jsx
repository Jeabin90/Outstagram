import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "../deleteaccount/DeleteAccount";

const API_URL = "http://localhost:8080/api/users";

function MyPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("posts");

    const [posts, setPosts] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // 저장된 JWT 가져오기
    const token = localStorage.getItem("token");

    /**
     * 내 회원정보 조회
     * GET /api/users/me
     */
    useEffect(() => {
        async function getMyProfile() {
            try {
                setIsLoading(true);
                setErrorMessage("");

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

                setUser(data.user);
            } catch (error) {
                console.error(error);
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        // if (!token) {
        //     navigate("/login");
        //     return;
        // }

        getMyProfile();
    }, [navigate, token]);

    /**
     * 게시물 탭을 눌렀을 때 실행
     * GET /api/users/me/posts
     */
    async function handlePostsTab() {
        try {
            setActiveTab("posts");
            setErrorMessage("");

            const response = await fetch(`${API_URL}/me/posts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "게시물 조회에 실패했습니다.");
            }

            setPosts(data.posts || []);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    }

    /**
     * 북마크 탭을 눌렀을 때 실행
     * GET /api/users/me/bookmarks
     */
    async function handleBookmarksTab() {
        try {
            setActiveTab("bookmarks");
            setErrorMessage("");

            const response = await fetch(`${API_URL}/me/bookmarks`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "북마크 조회에 실패했습니다.");
            }

            setBookmarks(data.bookmarks || []);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    }

    /**
     * 회원탈퇴
     * DELETE /api/users/me
     */
    async function handleDeleteAccount() {
        try {
            setIsDeleting(true);
            setErrorMessage("");

            const response = await fetch(`${API_URL}/me`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "회원탈퇴에 실패했습니다.");
            }

            // 탈퇴 후 JWT 제거
            localStorage.removeItem("token");

            alert(data.message || "회원탈퇴가 완료되었습니다.");

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            setIsDeleteModalOpen(false);
        } finally {
            setIsDeleting(false);
        }
    }

    if (isLoading) {
        return <div className="page-message">회원정보를 불러오는 중입니다.</div>;
    }

    if (!user) {
        return (
            <div className="page-message">
                <p>{errorMessage || "회원정보를 불러올 수 없습니다."}</p>
                <button type="button" onClick={() => navigate("/login")}>
                    로그인 화면으로 이동
                </button>
            </div>
        );
    }

    const currentList = activeTab === "posts" ? posts : bookmarks;

    return (
        <div className="mypage-layout">
            <aside className="sidebar">
                <div className="logo">Outstagram</div>
            </aside>

            <main className="mypage-container">
                <section className="profile-section">
                    <div className="profile-left">
                        <div className="profile-image">
                            {user.profileImage ? (
                                <img src={user.profileImage} alt="프로필" />
                            ) : (
                                <span>{user.name?.charAt(0)}</span>
                            )}
                        </div>

                        <div className="profile-info">
                            <h1>{user.name}</h1>
                            <strong>@{user.userid}</strong>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="profile-right">
                        <div className="profile-buttons">
                            <button
                                type="button"
                                onClick={() => navigate("/mypage/edit")}
                            >
                                내 정보 수정
                            </button>

                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                회원 탈퇴
                            </button>
                        </div>

                        <div className="profile-date">
                            <p>
                                <span>생성일</span>
                                {formatDate(user.createdAt)}
                            </p>

                            <p>
                                <span>마지막 수정일</span>
                                {formatDate(user.updatedAt)}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="content-section">
                    <div className="tab-buttons">
                        <button
                            type="button"
                            className={activeTab === "posts" ? "active" : ""}
                            onClick={handlePostsTab}
                        >
                            게시물
                        </button>

                        <button
                            type="button"
                            className={activeTab === "bookmarks" ? "active" : ""}
                            onClick={handleBookmarksTab}
                        >
                            북마크
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}

                    <div className="content-table">
                        <div className="table-header">
                            <span>제목</span>
                            <span>작성일</span>
                        </div>

                        <div className="table-body">
                            {currentList.length === 0 ? (
                                <p className="empty-message">
                                    {activeTab === "posts"
                                        ? "작성한 게시물이 없습니다."
                                        : "북마크한 게시물이 없습니다."}
                                </p>
                            ) : (
                                currentList.map((item) => (
                                    <button
                                        type="button"
                                        className="table-row"
                                        key={item._id}
                                        onClick={() => navigate(`/posts/${item._id}`)}
                                    >
                                        <span>{item.title}</span>
                                        <span>{formatDate(item.createdAt)}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                isDeleting={isDeleting}
                onConfirm={handleDeleteAccount}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "-";
    }

    return new Date(dateValue).toLocaleDateString("ko-KR");
}

export default MyPage;