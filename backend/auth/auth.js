const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

async function createToken(userBody){

    const token = await jwt.sign({ userId: userBody.id }, JWT_SECRET, {expiresIn: '1w'});
    return token
}

function requireUser(req, res, next){

    
    if(!req.user){
        res.status(401);

        next({
            name: "NotLoggedIn",
            message: "Sorry but you are not logged in"
        })
    }

    next()
}

function requireAdmin(req, res, next){

    if(!req.user || !req.user.admin){
        res.status(401);

        next({
            name: 'authorizationError',
            message: 'Sorry, this acction can only be performed by an admin'
        })
    }

    next()
}

module.exports = {
    createToken,
    requireUser,
    requireAdmin
}