const client = require('./index')

// everything to do with the brands db

async function getAllBrands(){
    const SQL = 'SELECT id, name as brandName, show_time, logo FROM brands;';

    const result = await client.query(SQL);

    return result.rows
}

module.exports = { getAllBrands };