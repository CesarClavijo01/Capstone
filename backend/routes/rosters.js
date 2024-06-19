const express = require('express');
const router = express.Router();

const dbRosters = require('../db/rosters')
const auth = require('../auth/auth') 

router.post('/:userid/:brandid/:wrestlerid', async (req, res, next) => {
    try{
        await dbRosters.createNewRoster(req.params.userid, req.params.brandid, req.params.wrestlerid);
        res.sendStatus(201);
    }
    catch(err){
        next(err)
    }
});

router.get('/', auth.requireUser, async(req, res, next) => {
    try{
        const { id } = req.user
        const _roster = await dbRosters.getRosterByUserId(id) 
        res.json(_roster)
    }
    catch(err){
        next(err)
    }
})


module.exports = router