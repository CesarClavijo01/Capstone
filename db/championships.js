const client = require('./index')

async function getAllChampionships(){
    const SQL = 'SELECT id, name as championshipName, picture, display_picture, info FROM championships;';

    const result = await client.query(SQL);

    return result.rows
}

module.exports = { getAllChampionships };