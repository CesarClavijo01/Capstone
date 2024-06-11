const client = require('./index');
const bcrypt = require('bcrypt');

async function createUser(userBody){
    //hash the password before storing it
    const password = await bcrypt.hash(userBody.password, 5)
    //Insert a new user into the user table
    const SQL = `INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5);`;

    try{
        const result = await client.query(SQL, [userBody.first_name, userBody.last_name, userBody.username, userBody.email, password])

        return{
            ...userBody
        }
    }
    catch(err){
        throw err
    }
};

async function getAllUsers(){
    //get all users from the database
    const SQL = `SELECT id, first_name, last_name, username, email, admin FROM users`;

    try{
        const result = await client.query(SQL);

        return result.rows
    }
    catch(err){
        throw new Error(err);
    }
}

async function getUserByUserEmail(userEmail){
    try{
        const { rows: user } = await client.query(`
            SELECT id, first_name, last_name, username, email, password, admin FROM users
            WHERE email=$1
        `, [userEmail]);

        if(!user){
            throw{
                name: 'UserNotFound',
                message: 'Sorry, That user does not exist'
            }
        }

        return user
    }
    catch(err){
        throw new Error(err)
    }

}

module.exports = {
    createUser,
    getAllUsers,
    getUserByUserEmail,
}