const client = require('./index')

async function getAllChampionships(){
    const SQL = 'SELECT id, name as championshipName, picture, display_picture, info FROM championships;';

    const result = await client.query(SQL);

    return result.rows
}

async function getChampionshipById(championshipId){
    try{
        const { rows: [championship] } = await client.query(`
        SELECT id, name as championshipName, picture, display_picture, info FROM championships
        WHERE id=$1
        `, [championshipId]);

        if(!championship){
            throw{
                name: 'ChampionshipNotFound',
                message: 'Sorry, we cant find that championship'
            }
        };

        return championship
    }
    catch(err){
        throw err
    }
}

module.exports = { 
    getAllChampionships,
    getChampionshipById
 };