const baseURL = 'http://localhost:3000/api';

//get all championships

export async function getChampionships(){
    try{
        const response = await fetch(`${baseURL}/championships`);
        const result= await response.json();
        console.log(result)
        return result;
    }
    catch(err){
        console.error(err)
    }
}

//get single championship

export async function getSingleChampionships(id){
    try{
        const response = await fetch (`${baseURL}/championships/${id}`);
        const result = await response.json();

        return result;
    }
    catch(err){
        console.error(err)
    }
}