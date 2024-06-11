const express = require('express');
const router = express.Router();

const dbUsers = require('../db/users');
const auth = require('../auth/auth')

router.post('/register', async (req, res, next) => {
    //post a new user
    console.log('req.body is', req.body)

    const { firstName, lastName, username, email, password } = req.body

    const userBody = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
    }

    try{
   
        const newUser = await dbUsers.createUser(userBody)

        const token = await auth.createToken(newUser)

        res.json({
            message: 'New user created',
            user:{
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                username: newUser.username,
                email: newUser.email,
            },
            token: token
        })
    }
    catch(err){
        next(err)
    }
});

router.get('/', async (req, res, next) => {
    try{
        const users = await dbUsers.getAllUsers();

        res.json(users)
    }
    catch(err){
        next(err)
    }
});

router.get('/login', async (req, res, next) => {
    try{

    }
    catch(err){
        next(err)
    }

})
module.exports = router