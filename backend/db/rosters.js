const client = require('./index')

async function createNewRoster(userId, brandId, wrestlerId){
    try{
        const SQL = `INSERT INTO rosters (user_id, brand_id, wrestler_id) VALUES ($1, $2, $3)`;
        await client.query(SQL, [userId, brandId, wrestlerId]);
    }
    catch(err){
        throw err
    }
}

async function removeRosterByWrestler(wrestlerId){
    try{

        const { rows: [ roster ] } = await client.query(`
            DELETE FROM rosters WHERE wrestler_id=$1`, [wrestlerId]
        );

        return roster
    }
    catch(err){
        throw err
    }
}

async function getRosterByWrestlerId(wrestlerId){
    try{

        const { rows: [roster] } = await client.query(`
            SELECT id, wrestler_id, brand_id FROM rosters WHERE wrestler_id=$1`, [wrestlerId]
        )

        return roster

    }
    catch(err){
        throw err
    }
}

async function getAllRosters(){
    try{
        const result = await client.query(`
            SELECT rosters.id as id, wrestlers.name as wrestlerName, wrestlers.bio as bio, wrestlers.picture as wrestlerPicture, wrestlers.rating as rating, wrestlers.category as category, wrestlers.accomplishments as accomplishments, `)
    }
    catch(err){
        throw err
    }
}

async function getRosterByBrand(brandId){
    try{
        const { rows: [ roster ] } = await client.query(`
            SELECT id as roster_id, wrestler_id, brand_id, user_id FROM rosters
            WHERE brand_id=$1`, [brandId]
        );

        console.log(roster)
        return roster
    }
    catch(err){
        throw err
    }
}

async function getRosterByUserId(userId){
    try{
        const { rows: [ roster] } = await client.query(`
            SELECT id, user_id, wrestler_id, brand_id FROM rosters
            WHERE user_id=$1`, [userId]
        );

        return roster
    }
    catch(err){
        throw err
    }
}

async function removeRoster(rosterId){
    try{
        const { rows: [ roster ] } = client.query(`
            DELETE FROM rosters WHERE id=$1`, [rosterId]
        );

        return roster
    }
    catch(err){
        throw err
    }
}

module.exports = {
    createNewRoster,
    removeRosterByWrestler,
    getRosterByWrestlerId, 
    getRosterByBrand,
    getRosterByUserId,
    removeRoster
}