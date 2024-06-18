const client = require('./index')

// everything to do with the brands db

async function getAllBrands(){
    const SQL = 'SELECT id, name as brandName, show_time, logo, is_default, user_id FROM brands;';

    const result = await client.query(SQL);

    return result.rows
}

async function getBrandById(brandId){
   
   try{
        const { rows: [ brand ] } = await client.query(`
            SELECT id, name as brandName, show_time, logo, is_default, user_id FROM brands
            WHERE id=$1
        `, [brandId]);

        return brand
    }
    catch(err){
        throw err;
    }
}

async function createNewBrand(brandObj, userId){  
    
    try{
        const { rows: [ brand ] } = await client.query(`
            INSERT INTO brands (name, show_time, description, logo, is_default, user_id) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`, [brandObj.name, brandObj.show_time, brandObj.description, brandObj.logo, brandObj.is_default, userId]
        );

        return brand
    }
    catch(err){
        throw err
    }
}

async function removeBrand(brandId){
    try{
        const { rows: [ brand ] } = await client.query(`
            DELETE FROM brands WHERE id=$1;`, [brandId]
        );

        return brand
    }
    catch(err){
        throw err
    }
}

module.exports = { 
    getAllBrands,
    getBrandById,
    createNewBrand,
    removeBrand
 };