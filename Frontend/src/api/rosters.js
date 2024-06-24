const baseURL = 'http://localhost:3000/api';

//create new roster
export async function createNewRoster(token, wrestlerId, brandId){
    try{
        const response = await fetch(`${baseURL}/rosters/${wrestlerId}/${brandId}`,{
            method: 'POST',
            headers:{
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

export async function getUserRosters(token){
    try{
        const response = await fetch(`${baseURL}/rosters`,{
            headers:{
                'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            }
        })

        const result = await response.json()

        return result
    }
    catch(err){
        console.error(err)
    }
}