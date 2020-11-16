const crypto = require('../modules/crypto');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { User } = require('../models');
module.exports = {
  signup: async (req, res) => {
    // 1. req.body에서 데이터 가져오기
    const { email, userName, password } = req.body;

    //2. request data 확인하기, email 또는 password data가 없다면 NullValue 반환
    if (!email || !password || !userName) {
      const missParameters = Object.entries({
        email,
        password,
        userName
      })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
      return;
    }

    //3. 존재하는 아이디인지 확인하기. 이미 존재하는 아이디면 ALREADY ID 반환
    const alreadyEmail = await User.findOne({
      where: {
        email: email,
      }
    });
    if (alreadyEmail) {
      console.log("이미 있는 아이디입니다.");
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    }

    //4. salt 생성
    //5. 2차 세미나때 배웠던 pbkdf2 방식으로 (비밀번호 + salt) 해싱하여 => 암호화된 password 를 만들기!
    const { hashed, salt } = await crypto.encrypt(password);

    //6. usersDB에 id, 암호화된 password, salt 저장!
    try {
      await User.create({
        email,
        userName,
        password: hashed,
        salt
      });
      //7. status: 200 message: SING_UP_SUCCESS, data: id만 반환! (비밀번호, salt 반환 금지!!)
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SING_UP_SUCCESS, email));
    } catch (err) {
      console.error(err);
    }
  },
  signin: async (req, res) => {
    // 1. req.body에서 데이터 가져오기
    const { email, password } = req.body;

    //2. request data 확인하기, email 또는 password data가 없다면 NullValue 반환
    if (!email || !password) {
      const missParameters = Object.entries({
        email,
        password,
      })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
      return;
    }

    //3. 존재하는 아이디인지 확인하기. 존재하지 않는 아이디면 NO USER 반환
    const alreadyEmail = await User.findOne({
      where: {
        email: email,
      }
    });
    if (!alreadyEmail) {
      console.log("존재하지 않는 아이디입니다.");
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    /**
     * 4. 비밀번호 확인하기 - 로그인할 email의 salt를 DB에서 가져와서 사용자가 request로 보낸 password와
     * 암호화를 한후 디비에 저장되어있는 password와 일치하면 true일치하지 않으면 Miss Match password 반환
    */
    const { hashed } = await crypto.encryptWithSalt(password, alreadyEmail.salt);
    if (user.password != hashed) {
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
    }

    //5. status: 200 ,message: SIGNIN SUCCESS, data: id 반환 (비밀번호, salt 반환 금지!!)
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, email));
  },
  update: async (req, res) => {

    const { userName } = req.body;
    const { id } = req.params;

    if (!userName || !id) {
      const missParameters = Object.entries({
        userName,
        id,
      })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
      return;
    }
    const alreadyId = await User.findOne({
      where: {
        id
      }
    });
    if (!alreadyId) {
      console.log("존재하지 않는 아이디입니다.");
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    try {
      await User.update({
        userName
      }, {
        where: {
          id: id
        },
      });
      const updateUser = await User.findOne({
        where: {
          id: id
        },
        attributes: ['userName', 'email']
      });
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_UPDATE_SUCCESS, updateUser));
    } catch (err) {
      console.error(err);
    }
  },
  delete: async (req, res) => {

    const { userName } = req.body;
    const { id } = req.params;

    if (!userName || !id) {
      const missParameters = Object.entries({
        userName,
        id,
      })
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, `${responseMessage.NULL_VALUE}, ${missParameters}`));
      return;
    }
    const alreadyId = await User.findOne({
      where: {
        id
      }
    });
    if (!alreadyId) {
      console.log("존재하지 않는 아이디입니다.");
      return res.status(statusCode.BAD_REQUEST).json(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const updateUser = await User.update({
      userName
    }, {
      where: {
        id: id
      }
    });

    //5. status: 200 ,message: SIGNIN SUCCESS, data: id 반환 (비밀번호, salt 반환 금지!!)
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_UPDATE_SUCCESS, updateUser));
  },
}