const client = require('./index')

async function getAllWrestlers(){
    const SQL = 'SELECT id, name as wrestlerName, bio, picture, rating, category, accomplishments, championship_id FROM wrestlers;';

    const result = await client.query(SQL);

    return result.rows
}

module.exports = { getAllWrestlers };