const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const dbUsers = require('../db/users');
const auth = require('../auth/auth')

router.post('/register', async (req, res, next) => {
    //post a new user

    const { first_name, last_name, username, email, password, admin } = req.body

    const userBody = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
        admin: admin
    }

    try{
        if(!first_name || !last_name || !username || !email || !password){
            next({
                name: 'MissingFields',
                message: 'Please fill out all fields'
            })
        }

        const _username = await dbUsers.getUserByUsername(username)

        if(_username){
            next({
                name: 'ExistingUsername',
                message: 'That username already exixts. Please try a new one'
            })
        }

        const _email = await dbUsers.getUserByUserEmail(email)

        if(_email){
            next({
                name: 'emailAlreadyInUse',
                message: 'That email is already being used, please try a different one'
            })
        }
   
        const newUser = await dbUsers.createUser(userBody)

        console.log(newUser)

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

router.get('/', auth.requireAdmin, async (req, res, next) => {
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

    console.log(password);

    if(!email || !password){
        next({
            name: 'missingCredentialsError',
            message: 'Please supply both a username and password'
        })
    }

    try{
        const user = await dbUsers.getUserByUserEmail(email)

        if(!user){
            next({
                name: 'userNotFound',
                message: 'Sorry we could not find that user'
            })
        }
        
        const match = await bcrypt.compare(password, user.password);

        if(user && match){

            const token = await auth.createToken(user);

            res.send({
                message: "You are logged in",
                user: user,
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

router.patch('/:userId', auth.requireAdmin, async(req, res, next) => {
    try{
        //get the id from params
        const { userId } = req.params;
        //find the user
        const _user = await dbUsers.getUserById(userId);

        if(!_user){
            next({
                name: 'noUserError',
                message: 'That user does not exist'
            })
        }

        const newAdmin = await dbUsers.updateAdmin(userId)

        res.json({
            name: 'success',
            message: 'New admin created'
        })
    }
    catch{

    }
})
module.exports = router