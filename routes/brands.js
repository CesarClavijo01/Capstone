const express = require('express');
const router = express.Router();

const dbBrands = require('../db/brands')

router.get('/', async (req, res, next) => {
    //get all brands from the db
    const brands = await dbBrands.getAllBrands();
    //return them
    res.json(brands);
})

module.exports = router