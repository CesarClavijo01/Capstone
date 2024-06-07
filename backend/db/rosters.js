const client = require('./index')

async function createNewRoster(userId, brandId, wrestlerId){
    try{
        const SQL = `INSERT INTO rosters (user_id, brand_id, wrestler_id) VALUES ($1, $2, $3)`;
        await client.query(SQL, [userId, brandId, wrestlerId]);
    }
    catch(err){
        throw err
    }
}

module.exports = {
    createNewRoster
}