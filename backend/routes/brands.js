const express = require('express');
const router = express.Router();

const dbBrands = require('../db/brands')

router.get('/', async (req, res, next) => {
    //get all brands from the db
    const brands = await dbBrands.getAllBrands();
    //return them
    res.json(brands);
})

router.get('/:brandId', async (req, res, next) => {
    try{
    //get brand id
    const { brandId } = req.params
    //get the brand with the id
    const brand = await dbBrands.getBrandById(brandId)

    res.json(brand);
    }
    catch(err){
        throw err
    }
})

module.exports = router