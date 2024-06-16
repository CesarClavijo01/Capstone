const baseURL = 'http://localhost:3000/api';


//getting all brands
export async function getBrands(){
    try{
        const response = await fetch(`${baseURL}/brands`);
        const result= await response.json();
        console.log(result)
        return result;
    }
    catch(err){
        console.error(err)
    }
}

//getting a single barnd

export async function getSingleBrand(id){
    try{
        const response = await fetch (`${baseURL}/brands/${id}`);
        const result = await response.json();

        return result;
    }
    catch(err){
        console.error(err)
    }
}