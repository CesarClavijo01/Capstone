const express = require('express');
const router = express.Router();

const dbRosters = require('../db/rosters')
const auth = require('../auth/auth') 

router.post('/:wrestlerId/:brandId', auth.requireUser, async (req, res, next) => {

    const { brandId, wrestlerId } = req.params
    const { id } = req.user
    try{
        //find if the wrestler is in a roster already
        const rosters = await dbRosters.getRostersByUserId(id)

        console.log('_roster is', rosters)

        const _wrestler = rosters.map((roster) =>
            roster.wrestlerid == wrestlerId
        )

        if(_wrestler.length > 0){
            next({
                name: 'RosterError',
                message: 'Sorry this wrestler already belongs in a brand'
            })
        }else if(_wrestler.length < 1){

            const newRoster = await dbRosters.createNewRoster(id, brandId, wrestlerId)

            res.send({
                name: 'success',
                message: 'New Roster Created',
                roster: newRoster
            })
        }
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