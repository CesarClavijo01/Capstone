const express = require('express');
const router = express.Router();

const dbChampionships = require('../db/championships')

router.get('/', async (req, res, next) => {
    //get all brands from the db
    const championships = await dbChampionships.getAllChampionships();
    //return them
    res.json(championships);
})

router.get('/:championshipId', async (req, res, next) => {
    try{
        //get the championship id
        const { championshipId } = req.params;
        //get the championship with the id
        const championship = await dbChampionships.getChampionshipById(championshipId);
        
        res.json(championship);
    }
    catch(err){
        throw err
    }
})

module.exports = router