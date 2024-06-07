const express = require('express');
const router = express.Router();

router.post('/:userid/:brandid/:wrestlerid', (req, res, next) => {
    res.send(`${req.params.userid}, ${req.params.brandid}, ${req.params.wrestlerid}`)
})

module.exports = router