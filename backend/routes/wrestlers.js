const express = require('express');
const router = express.Router();

const dbWrestlers = require('../db/wrestlers')

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
router.post('/', async (req, res, next) => {
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

module.exports = router