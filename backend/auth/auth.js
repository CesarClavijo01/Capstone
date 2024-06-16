const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function createToken(userBody){
    const token = await jwt.sign({ userId: userBody.id }, JWT_SECRET, {expiresIn: '1w'});
    return token
}



module.exports = {
    createToken,
}