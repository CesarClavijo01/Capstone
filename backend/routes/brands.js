const express = require('express');
const router = express.Router();

const dbBrands = require('../db/brands');
const auth = require('../auth/auth');
const dbRosters = require('../db/rosters')

//get all brands
router.get('/', async (req, res, next) => {
    //get all brands from the db
    const brands = await dbBrands.getAllBrands();
    //return them
    res.json(brands);
})

//get brands by id
router.get('/:brandId', async (req, res, next) => {
    try{
    //get brand id
    const { brandId } = req.params
    //get the brand with the id
    const brand = await dbBrands.getBrandById(brandId)

    res.json(brand);
    }
    catch(err){
        throw err
    }
})

//create a new brand
router.post('/', auth.requireUser, async (req, res, next) => {
    
    const { name, show_time, description, logo, is_default } = req.body

    const { id } = req.user

    const brandObj = {
        name: name,
        show_time: show_time,
        description: description,
        logo: logo,
        is_default: is_default,
    }


    try{

        if(!name || !show_time || !description || !logo){
            next({
                name: 'MissingFields',
                message: 'Please fill out all fields'
            })
        }
        const newBrand = await dbBrands.createNewBrand(brandObj, id)

        if(!newBrand){
            next({
                name: 'error',
                message: 'There was an error creating this brand'
            })
        }

        res.json({
            name: 'success',
            message: 'New Brand created',
            brand: {
                name: newBrand.name,
                show_time: newBrand.show_time,
                description: newBrand.description,
                logo: newBrand.logo,
                is_default: newBrand.is_default
            }
        })
    }
    catch(err){
        next(err)
    }
})

router.delete('/:brandId', auth.requireUser, async (req, res, next) => {

    const { brandId } = req.params;
    const { id } = req.user;

    console.log('brand id is', brandId)

    try{
        const _brand = await dbBrands.getBrandById(brandId)

        if(!_brand){
            next({
                name: 'BrandNotFound',
                message: 'Sorry we were unable to find that brand'
            })
        }

        if(id != _brand.user_id){
            next({
                name: 'UnauthorizedError',
                message: 'You can not perform that action'
            })
        }

        const _roster = await dbRosters.getRosterByBrand(brandId);
        console.log('roster is', _roster)

       

        if(id == _roster?.user_id){

            const removedRoster = await dbRosters.removeRoster(roster.id)

            console.log(removedRoster)

        }


        const removeBrand = await dbBrands.removeBrand(brandId)

        console.log(removeBrand)
    

        res.send({success: true})
    }
    catch(err){
        next(err)
    }

})

module.exports = router