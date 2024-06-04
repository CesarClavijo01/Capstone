const express = require('express');
const router = express.Router();

const dbWrestlers = require('../db/wrestlers')

router.get('/', async (req, res, next) => {
    //get all brands from the db
    const wrestlers = await dbWrestlers.getAllWrestlers();
    //return them
    res.json(wrestlers);
})

module.exports = router