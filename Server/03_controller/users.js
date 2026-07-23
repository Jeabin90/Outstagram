import * as userRepository from "../05_data/users.js"
import * as postRepository from "../05_data/posts.js"
// api/auth/signup 가 있어서 구현 안함
// export async function createUser(req, res) {
// }

export async function checkUseridDuplicated(req, res) {
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
}
