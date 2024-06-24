const client = require('./index')

async function createNewRoster(userId, brandId, wrestlerId){
    try{
        const SQL = `INSERT INTO rosters (user_id, brand_id, wrestler_id) VALUES ($1, $2, $3)
        RETURNING *`;
        const result = await client.query(SQL, [userId, brandId, wrestlerId]);

        return result.rows
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
            SELECT id, wrestler_id, brand_id, user_id FROM rosters WHERE wrestler_id=$1`, [wrestlerId]
        )

        return roster

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

async function getRostersByUserId(userId){
    try{
        const result = await client.query(`
            SELECT rosters.id as id, wrestlers.id as wrestler_id, wrestlers.name as wrestlerName, wrestlers.bio as bio, wrestlers.picture as wrestlerPicture, wrestlers.rating as rating, wrestlers.category as category, wrestlers.accomplishments as accomplishments, championships.name as championshipName, championships.picture as championshipPicture, championships.display_picture as championshipDisplayPicture, brands.name as brandName, brands.logo as logo, brands.is_default as isDefault, rosters.user_id as userId 
            FROM rosters
            left JOIN wrestlers on wrestlers.id=rosters.wrestler_id 
            left JOIN championships on championships.id=wrestlers.championship_id
            left JOIN brands on brands.id=rosters.brand_id
            WHERE rosters.user_id=$1`, [userId])

            return result.rows 
    }
    catch(err){
        throw err
    }
}

async function removeRoster(rosterId){
    try{
        const result = client.query(`
            DELETE FROM rosters WHERE id=$1`, [rosterId]
        );

        return result.rows
    }
    catch(err){
        throw err
    }
}

async function updateRoster(wrestlerId, brandId){
    try{
        const { rows: [ roster ] } = await client.query(`
            UPDATE rosters
            SET brand_id=$1
            WHERE wrestler_id=$2
            RETURNING *;`, [brandId, wrestlerId]
        )

        return roster
    }
    catch(err){
        throw err
    }
}

async function getRosterByUserId(userId){
    try{
        const { rows: [ roster ] } = await client.query(`
            SELECT id as roster_id, wrestler_id, brand_id, user_id FROM rosters
            WHERE brand_id=$1`, [userId]
        );

        return roster
    }
    catch(err){
        throw err
    }
}

async function getRosterByUserWrestlerId(userId, wrestler_id){
    try{
        const result = await client.query(`
            SELECT rosters.id as id, wrestlers.id as wrestler_id, wrestlers.name as wrestlerName, wrestlers.bio as bio, wrestlers.picture as wrestlerPicture, wrestlers.rating as rating, wrestlers.category as category, wrestlers.accomplishments as accomplishments, championships.name as championshipName, championships.picture as championshipPicture, championships.display_picture as championshipDisplayPicture, brands.name as brandName, brands.logo as logo, brands.is_default as isDefault, rosters.user_id as userId 
            FROM rosters
            left JOIN wrestlers on wrestlers.id=rosters.wrestler_id 
            left JOIN championships on championships.id=wrestlers.championship_id
            left JOIN brands on brands.id=rosters.brand_id
            WHERE rosters.user_id=$1
            AND wrestler_id=$2`, [userId, wrestler_id])

            return result.rows
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
    getRostersByUserId,
    removeRoster,
    updateRoster,
    getRosterByUserId,
    getRosterByUserWrestlerId
}