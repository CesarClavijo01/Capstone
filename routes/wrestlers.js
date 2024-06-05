const express = require('express');
const router = express.Router();

const dbWrestlers = require('../db/wrestlers')

router.get('/', async (req, res, next) => {
    //get all brands from the db
    const wrestlers = await dbWrestlers.getAllWrestlers();
    //return them
    res.json(wrestlers);
})

router.get('/:wrestlerId', async (req, res, next) => {
    //get single wrestler by id
    const { wrestlerId } = req.params;
    
    const wrestler = await dbWrestlers.getWrestlerById(wrestlerId);

    res.json(wrestler);
})

module.exports = router