const express = require('express');
const router = express.Router();

const dbRosters = require('../db/rosters')
const auth = require('../auth/auth') 

router.post('/:wrestlerId/:brandId', auth.requireUser, async (req, res, next) => {

    const { brandId, wrestlerId } = req.params
    const { id } = req.user
    try{
        //find if the wrestler is in a roster already
        const _wrestlers = await dbRosters.getRosterByUserWrestlerId(id, wrestlerId);
        console.log('w', _wrestlers)

        if(_wrestlers.length > 0){
            for(let i = 0; i < _wrestlers.length; i++){
                await dbRosters.removeRoster(_wrestlers[i].id)
            }
        }

        const newRoster = await dbRosters.createNewRoster(id, brandId, wrestlerId)

        res.send({
            name: 'success',
            message: 'New Roster Created',
            roster: newRoster
        })
        
    }
    catch(err){
        next(err)
    }
});

router.get('/', auth.requireUser, async(req, res, next) => {
    try{
        const { id } = req.user
        const _roster = await dbRosters.getRostersByUserId(id) 
        res.json(_roster)
    }
    catch(err){
        next(err)
    }
})


module.exports = router