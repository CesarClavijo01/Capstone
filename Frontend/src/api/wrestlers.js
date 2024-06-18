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

//post new wrestlers in wrestler table

export async function newWrestlers(wrestlersObj) {
    try{
        const response = await fetch(`${baseURL}/api/wrestlers`, {
            method: 'post',
            body: JSON.stringify(wrestlersObj),
            headers: {
                'content-type': 'application/json',
            }
        });
        const newWrestler = await response.json();

        return newWrestler;
    }
    catch(err){
        console.error(err)
    }
}

//delete wrestler