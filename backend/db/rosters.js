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

module.exports = {
    createNewRoster,
    removeRosterByWrestler,
    getRosterByWrestlerId
}