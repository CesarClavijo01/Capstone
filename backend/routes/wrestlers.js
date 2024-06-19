const express = require('express');
const router = express.Router();

const dbWrestlers = require('../db/wrestlers');
const auth = require('../auth/auth');
const dbRosters = require('../db/rosters');

//get all wrestlers
router.get('/', async (req, res, next) => {
    //get all brands from the db
    const wrestlers = await dbWrestlers.getAllWrestlers();
    //return them
    res.json(wrestlers);
})

//get wrestlers by Id
router.get('/:wrestlerId', async (req, res, next) => {
    //get single wrestler by id
    const { wrestlerId } = req.params;
    
    const wrestler = await dbWrestlers.getWrestlerById(wrestlerId);

    res.json(wrestler);
})

//create a new wrestler
router.post('/', auth.requireAdmin, async (req, res, next) => {
    //get new wrestler info
    const { name, bio, picture, rating, category, accomplishments } = req.body


    const wrestlerObj = {
        name: name,
        bio: bio,
        picture: picture,
        rating: rating,
        category: category,
        accomplishments: accomplishments
    }


    try{
        const newWrestler = await dbWrestlers.createNewWrestler(wrestlerObj);

        res.json({
            name: 'success',
            message: 'new wrestler created',
            wrestler: {
                name: newWrestler.name,
                bio: newWrestler.bio,
                picture: newWrestler.picture,
                rating: newWrestler.rating,
                category: newWrestler.category,
                accomplishments: newWrestler.accomplishments
            }
        })
    }
    catch({ name, message }){
        next({ name, message })
    }
})

router.delete('/:wrestlerId', auth.requireAdmin, async (req, res, next) => {
    const { wrestlerId } = req.params;
    try{
    const wrestlerToRemove = await dbWrestlers.getWrestlerById(wrestlerId)

    if(!wrestlerToRemove){
        next({
            name: "WrestlerNotFound",
            message: "Sorry we were unable to delete that wrestler"
        })
    }

    //remove the wrestler from rosters

    const _roster = await dbRosters.getRosterByWrestlerId(wrestlerId);
    
    if(_roster){
        const deleteRoster = await dbRosters.removeRosterByWrestler(wrestlerId);
    }

    const removedWrestler = await dbWrestlers.removeWrestler(wrestlerId);

    res.send({success: true})
    }
    catch(err){
        next(err)
    }
})

router.patch('/:wrestlerId/:championshipId', auth.requireAdmin, async(req, res, next) => {
    // get ids from params

    const { wrestlerId, championshipId } = req.params;

    try{
        //find the wrestler
        const _wrestler = await dbWrestlers.getWrestlerById(wrestlerId);

        if(!_wrestler){
            next({
                name: 'WrestlerNotFound',
                message: 'This wrestler does not exist'
            })
        }

        const updatedWrestler = await dbWrestlers.updateWrestlerChampionship(wrestlerId, championshipId)

        res.json({
            name: 'success',
            message: 'Championship updated'
        })
    }
    catch(err){
        next(err)
    }
})

router.patch('/:wrestlerId', auth.requireAdmin, async (req, res, next) => {
    //get the wrestler id from params
    const { wrestlerId } = req.params;

    try{
        //find the wrestler to update
        const _wrestler = await dbWrestlers.getWrestlerById(wrestlerId)

        //throw err if _wrestler doesn't exist
        if(!_wrestler){
            next({
                name: 'WrestlerNotFound',
                message: 'This wrestler does not exist'
            })
        }
        //remove the championship from the wrestler

        const oldChamp = await dbWrestlers.removeChampionship(wrestlerId)

        res.json({
            name: 'success',
            message: 'Wrestler Updated Succesfully'
        })
    }
    catch(err){
        next(err)
    }
})

module.exports = router