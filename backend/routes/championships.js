const express = require('express');
const router = express.Router();

const dbChampionships = require('../db/championships')

//get all championships
router.get('/', async (req, res, next) => {
    //get all championships from the db
    const championships = await dbChampionships.getAllChampionships();
    //return them
    res.json(championships);
})

//get championship by id
router.get('/:championshipId', async (req, res, next) => {
    try{
        //get the championship id
        const { championshipId } = req.params;
        //get the championship with the id
        const championship = await dbChampionships.getChampionshipById(championshipId);
        
        res.json(championship);
    }
    catch(err){
        next(err)
    }
})

module.exports = router