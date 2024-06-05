const client = require('./index')

async function getAllWrestlers(){
    const SQL = `
    SELECT wrestlers.id as id, wrestlers.name as wrestlerName, bio, wrestlers.picture, rating, category, accomplishments, championships.name as championship, championships.picture as championship_picture, championships.display_picture as display FROM wrestlers
    left JOIN championships on championships.id = wrestlers.championship_id
    `;

    const result = await client.query(SQL);

    return result.rows
}

async function getWrestlerById(wrestlerId){
    try{
        const { rows: [ wrestler ] } = await client.query(`
        SELECT wrestlers.id as id, wrestlers.name as wrestlerName, bio, wrestlers.picture, rating, category, accomplishments, championships.name as championship, championships.picture as championship_picture, championships.display_picture as display FROM wrestlers
        left JOIN championships on championships.id = wrestlers.championship_id
        WHERE wrestlers.id=$1 
        `, [wrestlerId]);

        if(!wrestler){
            throw{
                name: 'WrestlerNotFound',
                message: 'There is no wrestler with that id'
            }
        }

        return wrestler;
    }
    catch(err){
        throw err
    }
}

module.exports = { 
    getAllWrestlers,
    getWrestlerById
 };