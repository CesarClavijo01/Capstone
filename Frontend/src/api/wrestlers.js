const baseURL = 'http://localhost:3000';

//getting wrestlers

export async function getWrestlers(){
    try{
        const response = await fetch(`${baseURL}/wrestlers`);
        const result= await response.json();
        console.log(result)
        return result;
    }
    catch(err){
        console.error(err)
    }
}


//getting single wrestler

export async function getSingleWrestler(){
    try{
        const response = await fetch (`${baseURL}/wrestlers/${id}`);
        const result = await response.json();

        return result;
    }
    catch(err){
        console.error(err)
    }
}

getWrestlers()