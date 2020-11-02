const fs = require('fs');
const crypto = require('crypto');

const fileName = "3rdLevel3";
const password = 'password test';
crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
    fs.writeFile(`${fileName}.txt`, key.toString('base64'), () => {
      console.log(`file[${fileName}] write complete`);
    });

  })
});
