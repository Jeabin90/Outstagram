import * as userRepository from "../05_data/users.js"
<<<<<<< HEAD
import * as postRepository from "../05_data/posts.js"
=======
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
// api/auth/signup 가 있어서 구현 안함
// export async function createUser(req, res) {
// }

export async function checkUseridDuplicated(req, res) {
<<<<<<< HEAD
}

export async function checkEmailDuplicated(req, res) {
}

export async function getMyProfile(req, res) {
    try {
        const userid = req.userid

        if (!userid) {
            return res.status(401).json({
                message: "로그인이 필요합니다."
            })
        }

        const user = await userRepository.findById(userid)

        if (!user) {
            return res.status(404).json({
                message: "사용자를 찾을 수 없습니다."
            })
        }

        return res.status(200).json({
            message: "회원정보 조회 성공",
            user
        })
    } catch (error) {
        console.error("회원정보 조회 오류: ", error)
        return res.status(500).json({
            message: "회원정보 조회 중 오류가 발생했습니다."
        })
    }
}

export async function updateMyProfile(req, res) {
    try {
        const userid = req.id
        const { name, email } = req.body
        const updateData = {}

        if (name !== undefined) {
            updateData.name = name
        }

        if (email !== undefined) {
            updataDate.email = email
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "수정할 회원정보를 입력해주세요."
            })
        }

        const updatedUser = await userRepository.updateById(
            userid,
            updateData
        )

        if (!updatedUser) {
            return res.status(404).json({
                message: "사용자를 찾을 수 없습니다."
            })
        }

        return res.status(200).json({
            message: "회원정보가 수정되었습니다.",
            user: updatedUser
        })
    } catch (error) {
        console.error("회원정보 수정 오류: ", error)
    }
}

export async function deleteMyAccount(req, res) {
    try {
        const userid = req.id
        const deletedUser = await userRepository.deleteById(userid)

        if (!deletedUser) {
            return res.status(404).json({
                message: "사용자를 찾을 수 없습니다."
            })
        }

        return res.status(200).json({
            message: "회원탈퇴가 완료되었습니다."
        })
    } catch (error) {
        console.error("회원탈퇴 오류: ", error)
        return res.status(500).json({
            message: "회원탈퇴 중 오류가 발생했습니다."
        })
    }
}

export async function getMyPosts(req, res) {
    try {
        const userid = req.id
        const data = await (userid ? postRepository.getAll(userid) : postRepository.getAll())

        if (!data) {
            return res.status(404).json({
                message: "게시물을 찾을 수 없습니다."
            })
        }

        res.status(200).json({
            message: "게시물 불러오기 완료"
        })

    } catch (error) {
        console.error("로딩 오류: ", error)
        return res.status(500).json({
            message: "게시물 로딩 중 오류가 발생했습니다."
        })
    }
}

export async function getMyBookmarks(req, res) {
    try{

    }catch(error){
        
    }
=======
    try {
        const { userid } = req.query

        // 아이디가 전달되지 않은 경우
        if (!userid) {
            return res.status(400).json({
                message: "아이디를 입력해주세요."
            })
        }

        // 아이디 형식 검사
        const useridRegex = /^[a-z0-9]{4,12}$/

        if (!useridRegex.test(userid)) {
            return res.status(400).json({
                message: "아이디는 소문자와 숫자를 사용하여 4~12자로 입력해주세요."
            })
        }

        // DB에서 아이디 조회
        const foundUserid = await userRepository.findByUserid(userid)

        if (foundUserid) {
            return res.status(409).json({
                available: false,
                message: "이미 사용 중인 아이디입니다."
            })
        }

        return res.status(200).json({
            available: true,
            message: "사용 가능한 아이디입니다."
        })
    } catch (error) {
        console.error("아이디 중복 확인 오류:", error)

        return res.status(500).json({
            message: "아이디 중복 확인 중 오류가 발생했습니다."
        })
    }
}

export async function checkEmailDuplicated(req, res) {
    try {
        const { email } = req.query

        // 이메일이 전달되지 않은 경우
        if (!email) {
            return res.status(400).json({
                message: "이메일을 입력해주세요."
            })
        }

        // 이메일 형식 검사
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "올바른 이메일 형식으로 입력해주세요."
            })
        }

        // DB에서 이메일 조회
        const foundEmail = await userRepository.findByEmail(email)

        if (foundEmail) {
            return res.status(409).json({
                available: false,
                message: "이미 사용 중인 이메일입니다."
            })
        }

        return res.status(200).json({
            available: true,
            message: "사용 가능한 이메일입니다."
        })
    } catch (error) {
        console.error("이메일 중복 확인 오류:", error)

        return res.status(500).json({
            message: "이메일 중복 확인 중 오류가 발생했습니다."
        })
    }
}

export async function getMyProfile(req, res) {
}

export async function updateMyProfile(req, res) {
}

export async function deleteMyAccount(req, res) {
}

export async function getMyPosts(req, res) {
}

export async function getMyBookmarks(req, res) {
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
}
