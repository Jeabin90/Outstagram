function DeleteAccount({
    isOpen,
    isDeleting,
    onConfirm,
    onCancel,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="delete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="delete-modal-title">회원 탈퇴</h2>

                <p>정말 회원 탈퇴하시겠습니까?</p>
                <p className="delete-warning">
                    탈퇴한 회원정보는 복구할 수 없습니다.
                </p>

                <div className="modal-button-group">
                    <button
                        type="button"
                        className="modal-cancel-button"
                        onClick={onCancel}
                        disabled={isDeleting}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        className="modal-confirm-button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "탈퇴 처리 중..." : "확인"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;