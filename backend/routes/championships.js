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

//create a new championship
router.post('/', async (req, res, next) => {
    const { name, picture, display_picture, info } = req.body

    try{
        const _championship = await dbChampionships.getChampionshipByName(name);

        const championshipObj = {
            name: name,
            picture: picture,
            display_picture: display_picture,
            info: info
        }
    
        if(_championship){
            next({
                name: 'championshipDuplicate',
                message: 'This Championship already exixst'
            })
        }else{
    
            const newChampionship = await dbChampionships.createNewChampionship(championshipObj)

            res.json({
                name: 'success',
                message: 'New Championship Created',
                championship:{
                    id: newChampionship.id,
                    name: newChampionship.name,
                    picture: newChampionship.picture,
                    display_picture: newChampionship.display_picture,
                    info: newChampionship.info
                }
            })
        }

    }
    catch(err){
        next(err)
    }

})

module.exports = router