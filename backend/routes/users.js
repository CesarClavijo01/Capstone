const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const dbUsers = require('../db/users');
const auth = require('../auth/auth')

router.post('/register', async (req, res, next) => {
    //post a new user

    const { first_name, last_name, username, email, password } = req.body

    const userBody = {
        first_name: first_name,
        last_name: last_name,
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

router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password){
        next({
            name: 'missingCredentialsError',
            message: 'Please supply both a username and password'
        })
    }

    try{
        const user = await dbUsers.getUserByUserEmail(email)
        const match = await bcrypt.compare(password, user[0].password);

        if(user && match){

            const token = await auth.createToken(user);

            res.send({
                message: "You are logged in",
                token: token
            })
        }
        else{
            res.send({
                name:'logginFailed',
                message: 'Incorrect password or email. Please try again'
            })
        }

    }
    catch(err){
        next(err)
    }

})
module.exports = router