const client = require('./index');
const bcrypt = require('bcrypt');

async function createUser(userBody){
    //hash the password before storing it
    const password = await bcrypt.hash(userBody.password, 5)
    //Insert a new user into the user table
    // const SQL = `INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5);`;

    try{
        const { rows: [ user ] } = await client.query(`INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`, [userBody.first_name, userBody.last_name, userBody.username, userBody.email, password])

        return user
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
        const { rows: [user] } = await client.query(`
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

async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT id, first_name, last_name, username, email, password, admin FROM users
        WHERE id=$1
      `, [userId]);
  
      if (!user) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that id does not exist"
        }
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    createUser,
    getAllUsers,
    getUserByUserEmail,
    getUserById
}