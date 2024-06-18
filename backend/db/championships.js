const client = require('./index')

async function getAllChampionships(){
    const SQL = 'SELECT id, name as championshipName, picture, display_picture, info FROM championships;';

    const result = await client.query(SQL);

    return result.rows
}

async function getChampionshipById(championshipId){
    try{
        const { rows: [championship] } = await client.query(`
        SELECT id, name as championshipName, picture, display_picture, info FROM championships
        WHERE id=$1
        `, [championshipId]);

        if(!championship){
            throw{
                name: 'ChampionshipNotFound',
                message: 'Sorry, we cant find that championship'
            }
        };

        return championship
    }
    catch(err){
        throw err
    }
}

async function getChampionshipByName(championshipName){
    try{
        const { rows: [championship] } = await client.query(`
        SELECT id, name as championshipName, picture, display_picture, info FROM championships
        WHERE name=$1
        `, [championshipName]);
        

        return championship
    }
    catch(err){
        throw new Error(err)
    }
}

async function createNewChampionship(championshipBody){
    try{

        console.log('db championship', championshipBody)

        const { rows: [ championship ] } = await client.query(`
            INSERT INTO championships (name, picture, display_picture, info) VALUES ($1, $2, $3, $4)
            RETURNING *;`, [championshipBody.name, championshipBody.picture, championshipBody.display_picture, championshipBody.info]
        )

        console.log('the championship', championship)

        return championship
    }
    
    catch(err){
        throw new Error(err)
    }
}

async function removeChampionship(championshipId){
    try{
        const { rows: [ championship ] } = await client.query(`
            DELETE FROM championships WHERE id=$1
            `,[championshipId]
        );

        return championship
    }
    catch(err){
        throw err
    }
}

module.exports = { 
    getAllChampionships,
    getChampionshipById,
    getChampionshipByName,
    createNewChampionship,
    removeChampionship
 };