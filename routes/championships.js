const express = require('express');
const router = express.Router();

const dbChampionships = require('../db/championships')

router.get('/', async (req, res, next) => {
    //get all brands from the db
    const championships = await dbChampionships.getAllChampionships();
    //return them
    res.json(championships);
})

module.exports = router