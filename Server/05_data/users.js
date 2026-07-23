// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
//                                 Prev Version [X-Server]                             // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// import MongoDB from "mongodb"
// import { getUsers } from "../101_db/database.js"

// const ObjectId = MongoDB.ObjectId

// export async function findByUserid(userid) {
//     return getUsers().find({ userid }).next().then(mapOptionalUser)
// }

// export async function createUser(user) {
//     return getUsers().insertOne(user).then((result) => result.insertedId.toString())
// }

// export async function findById(id) {
//     return getUsers().find({ _id: new ObjectId(id) }).next().then(mapOptionalUser)
// }

// function mapOptionalUser(user) {
//     return user ? { ...user, id: user._id.toString() } : user
// }
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


/**
 *  {
 *  	_id: ObjectId,
 *  	userid: String,
 *  	passwordHash: String,
 *  	name: String,
 *  	email: String,
 *  	createdAt: Date,
 *  	updatedAt: Date
 *  }
 */

import User from "../103_models/user.js";


/**
 *  사용자 생성해주기
 * 
 * input:
 * {
 *   userid: String,
 *   passwordHash: String,
 *   name: String,
 *   email: String
 * }
 *
 * output:
 * _id: ObjectId,
 * userid: String,
 * passwordHash: String,
 * name: String,
 * email: String,
 * createdAt: Date,
 * updatedAt: Date
 */
<<<<<<< HEAD
export async function createUser({ userid, passwordHash, name, email }) {
  return await User.create({ userid, passwordHash, name, email })
=======
export async function createUser({ userid, passwordHash, name, nickName, email }) {
  return await User.create({ userid, passwordHash, name, nickName, email })
}

// 회원가입 및 아이디 중복 확인용
export async function findByUserid(userid) {
  return User.findOne({ userid })
    .select("_id")
}

// 이메일로 회원 중복확인
export async function findByEmail(email) {
  return User.findOne({ email }).select("_id")
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
}

/**
 * users.userid를 통해 사용자의 모든 컬럼 뽑아주기 (passwordHash 제외)
 * 
 * input: String(userid)
 *
 * output:
 * _id: ObjectId,
 * userid: String,
 * name: String,
 * email: String,
 * createdAt: Date,
 * updatedAt: Date
 */
<<<<<<< HEAD
export async function findByUserid(userid) {
  return await User.findOne({ userid }).select("_id userid name email createdAt updatedAt")
}
=======
// 아이디로 회원 찾기
// export async function findByUserid(userid) {
//   return await User.findOne({ userid }).select("_id userid name email createdAt updatedAt")
// }

>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f

/**
 * users.userid를 통해 사용자의 모든 컬럼 뽑아주기 (passwordHash 포함)
 * 
 * input: String(userid)
 *
 * output:
 * _id: ObjectId,
 * userid: String,
 * passwordHash: String,
 * name: String,
 * email: String,
 * createdAt: Date,
 * updatedAt: Date
 */
export async function findByUserIdIncludePassword(userid) {
  return await User.findOne({ userid }).select("_id userid passwordHash name email createdAt updatedAt")
}

/**
 * users._id를 통해 사용자의 모든 컬럼 뽑아주기 (passwordHash 제외)
 * 
 * input: String(_id) 또는 mongoose.Schema.Types.ObjectId
 *
 * output:
 * _id: ObjectId,
 * userid: String,
 * name: String,
 * email: String,
 * createdAt: Date,
 * updatedAt: Date
 */
export async function findById(id) {
  return await User.findById(id).select("_id userid name email createdAt updatedAt")
}


/**
 * users._id를 통해 사용자의 모든 컬럼 뽑아주기 (passwordHash 포함)
 * 
 * input: Stirng(_id) 또는 mongoose.Schema.Type.ObjectId 
 * 
 * _id: ObjectId,
 * userid: String,
 * passwordHash: String,
 * name: String,
 * email: String,
 * createdAt: Date,
 * updatedAt: Date
 */
/**
 * input: String(_id) 또는 mongoose.Schema.Types.ObjectId
 *
 * output:
 * _id: ObjectId,
 * userid: String,
 * passwordHash: String,
 * name: String,
 * email: String,
 * createdAt: Date,
 * updatedAt: Date
 */
export async function findByIdIncludePassword(id) {
  return await User.findById(id).select("_id userid passwordHash name email createdAt updatedAt")
}
<<<<<<< HEAD

/**
 * 회원정보 수정
 *
 * input:
 * - id: 로그인 사용자의 _id
 * - updateData: 수정할 필드
 *
 * output:
 * - 수정된 사용자 정보
 */
export async function updateById(id, updateData) {
  return await User.findByIdAndUpdate(
    id,
    {
      $set: updateData
    },
    {
      new: true,          // 수정된 결과를 반환
      runValidators: true // Schema 유효성 검사 실행
    }
  ).select("_id userid name email createdAt updatedAt");
}

/**
 * 회원 삭제
 *
 * input:
 * - id: 로그인 사용자의 _id
 *
 * output:
 * - 삭제된 사용자 정보
 */
export async function deleteById(id) {
  return await User.findByIdAndDelete(id)
    .select("_id userid name email createdAt updatedAt");
}
=======
>>>>>>> 4de5ac110adbae62320d8a9ea107b558dd9a1b8f
