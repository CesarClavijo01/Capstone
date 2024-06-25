const baseURL = 'http://localhost:3000';

//getting wrestlers

export async function getWrestlers(){
    try{
        const response = await fetch(`${baseURL}/api/wrestlers`);
        const result= await response.json();
        console.log(result)
        return result;
    }
    catch(err){
        console.error(err)
    }
}


//getting single wrestler

export async function getSingleWrestler(id){
    try{
        const response = await fetch (`${baseURL}/api/wrestlers/${id}`);
        const result = await response.json();

        return result;
    }
    catch(err){
        console.error(err)
    }
}

//create new wrestlers 

export async function newWrestlers(wrestlersObj, token) {
    try{
        console.log(token)
        const response = await fetch(`${baseURL}/api/wrestlers`, {
            method: 'post',
            body: JSON.stringify(wrestlersObj),
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const newWrestler = await response.json();

        return newWrestler;
    }
    catch(err){
        console.error(err)
    }
}

export async function updateWrestlerChampionship(token, wrestlerId, championshipId){
    try{
        const response = await fetch(`${baseURL}/api/wrestlers/${wrestlerId}/${championshipId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }   
        })

        const result = await response.json();

        return result
    }
    catch(err){
        console.error(err)
    }
}

export async function removeChampion(token, wrestlerId){
    try{
        const response = await fetch(`${baseURL}/api/wrestlers/${wrestlerId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })

        const result = await response.json();
        
        return result
    }
    catch(err){
        console.error(err)
    }
}
//delete wrestler