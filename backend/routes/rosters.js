const express = require('express');
const router = express.Router();

const dbRosters = require('../db/rosters')

router.post('/:userid/:brandid/:wrestlerid', async (req, res, next) => {
    try{
        await dbRosters.createNewRoster(req.params.userid, req.params.brandid, req.params.wrestlerid);
        res.sendStatus(201);
    }
    catch(err){
        next(err)
    }
});

module.exports = router