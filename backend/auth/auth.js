const jwt = require('jsonwebtoken');
const secretKey = 'mysupersecretkey';

async function createToken(userBody){
    const token = await jwt.sign({ userId: userBody.id }, secretKey, {expiresIn: '1w'});
    return token
}

module.exports = {
    createToken,
}