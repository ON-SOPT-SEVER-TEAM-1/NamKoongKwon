const express = require('express');
const router = express.Router();
const crypto = require('../../modules/crypto');
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let usersDB = require('../../modules/users');
router.post('/signup', async (req, res) => {
  // 1. req.body에서 데이터 가져오기
  const { id, password } = req.body;

  //2. request data 확인하기, id 또는 password data가 없다면 NullValue 반환
  if (!id || !password) {
    const missParameters = Object.entries({
      id,
      password,
    })
      .filter(it => it[1] == undefined).map(it => it[0]).join(',');
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
    return;
  }

  //3. 존재하는 아이디인지 확인하기. 이미 존재하는 아이디면 ALREADY ID 반환
  const user = usersDB.find(user => user.id == id);
  if (user !== undefined) {
    console.log("이미 있는 아이디입니다.");
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
  }

  //4. salt 생성
  //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) 해싱하여 => 암호화된 password 를 만들기!
  const { hashed, salt } = await crypto.encrypt(password);

  //6. usersDB에 id, 암호화된 password, salt 저장!
  usersDB.push({
    id,
    password: hashed,
    salt
  });
  //7. status: 200 message: SING_UP_SUCCESS, data: id만 반환! (비밀번호, salt 반환 금지!!)
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SING_UP_SUCCESS, id));
})
router.post('/signin', async (req, res) => {
  // 1. req.body에서 데이터 가져오기
  const { id, password } = req.body;

  //2. request data 확인하기, id 또는 password data가 없다면 NullValue 반환
  if (!id || !password) {
    const missParameters = Object.entries({
      email,
      password,
    })
      .filter(it => it[1] == undefined).map(it => it[0]).join(',');
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
    return;
  }

  //3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
  const user = usersDB.find(user => user.id == id);
  if (user == undefined) {
    console.log("존재하지 않는 아이디입니다.");
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  /**
   * 4. 비밀번호 확인하기 - 로그인할 id의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와
   * 암호화를 한후 디비에 저장되어있는 password와 일치하면 true일치하지 않으면 Miss Match password 반환
  */
  const { hashed } = await crypto.encryptWithSalt(password, user.salt);
  if (user.password != hashed) {
    return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  //5. status: 200 ,message: SIGNIN SUCCESS, data: id 반환 (비밀번호, salt 반환 금지!!)
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, id));
})

router.get('/', (req, res) => {
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USER_READ_ALL_SUCCESS, usersDB));
})
module.exports = router;