const client = require('./index')

// everything to do with the brands db

async function getAllBrands(){
    const SQL = 'SELECT id, name as brandName, show_time, logo FROM brands;';

    const result = await client.query(SQL);

    return result.rows
}

async function getBrandById(brandId){
   
   try{
        const { rows: [brand] } = await client.query(`
            SELECT id, name as brandName, show_time, logo FROM brands
            WHERE id=$1
        `, [brandId]);
        
        if(!brand){
            throw{
                name: 'brandNotFound',
                message: 'Sorry, we cant find that brand'
            }
        }

        return brand
    }
    catch(err){
        throw err;
    }
}

module.exports = { 
    getAllBrands,
    getBrandById
 };