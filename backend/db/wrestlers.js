const client = require('./index')

async function getAllWrestlers(){
    const SQL = `
    SELECT wrestlers.id as id, wrestlers.name as wrestlerName, bio, wrestlers.picture, rating, category, accomplishments, championships.name as championship, championships.picture as championship_picture, championships.display_picture as display FROM wrestlers
    left JOIN championships on championships.id = wrestlers.championship_id
    `;

    const result = await client.query(SQL);

    return result.rows
}

async function getWrestlerById(wrestlerId){
    try{
        const { rows: [ wrestler ] } = await client.query(`
        SELECT wrestlers.id as id, wrestlers.name as wrestlerName, bio, wrestlers.picture, rating, category, accomplishments, championships.name as championship, championships.picture as championship_picture, championships.display_picture as display FROM wrestlers
        left JOIN championships on championships.id = wrestlers.championship_id
        WHERE wrestlers.id=$1 
        `, [wrestlerId]);

        if(!wrestler){
            throw{
                name: 'WrestlerNotFound',
                message: 'There is no wrestler with that id'
            }
        }

        return wrestler;
    }
    catch(err){
        throw err
    }
}

async function getWrestlerByName(wrestlerName){
    //Get a wrestler by its name
    try{
        const { rows: [ wrestler ] } = await client.query(`SELECT * From wrestlers 
        WHERE name=$1`, [wrestlerName]);

        return wrestler
    }
    catch(err){
        throw err
    }
}

async function createNewWrestler(wrestlerObj){
    const SQL = `INSERT INTO wrestlers (name, bio, picture, rating, category, accomplishments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`

    try{
        //Insert a new wrestler into the wrestler table
        const queriedWrestler = await getWrestlerByName(wrestlerObj.name)

        if(!queriedWrestler){
            const { rows: [ wrestler ] } = await client.query(SQL, [wrestlerObj.name, wrestlerObj.bio, wrestlerObj.picture, wrestlerObj.rating, wrestlerObj.category, wrestlerObj.accomplishments])

            console.log('wrestler', wrestler)

            return wrestler
        }else{

            throw{
                name: 'existingWrestlerError',
                message: 'This wrestler already exist'
            }
        }

    }
    catch(err){
        throw err
    }
}

async function removeWrestler(wrestlerId){
    try{
        const { rows: [ wrestler ] } = await client.query(`
            DELETE FROM wrestlers WHERE id=$1;    
            `, [wrestlerId]
        );

        return wrestler
    }
    catch(err){
        throw err
    }
}

async function updateWrestlerChampionship(wrestlerId, championshipId){

    try{
        
        const { rows: [ wrestler ] } = await client.query(`
            UPDATE wrestlers
            SET championship_id=$1
            WHERE id=$2
            RETURNING *;`, [championshipId, wrestlerId]
        ) 
        
        return wrestler
    }
    catch(err){
        throw err
    }
}

async function removeChampionship(wrestlerId){
    try{

        const { rows: [ wrestler ] } = await client.query(`
            UPDATE wrestlers
            SET championship_id=null
            WHERE id=$1
            RETURNING *;`, [wrestlerId]
        )

        return wrestler
    }
    catch(err){
        throw err
    }
}

module.exports = { 
    getAllWrestlers,
    getWrestlerById,
    createNewWrestler,
    removeWrestler,
    updateWrestlerChampionship,
    removeChampionship
 };