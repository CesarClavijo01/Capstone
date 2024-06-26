const baseURL = 'https://capstone-sd4h.onrender.com';


//getting all brands
export async function getBrands(){
    try{
        const response = await fetch(`${baseURL}/brands`);
        const result= await response.json();

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

//create new brand

export async function newBrands(brandsObj, token) {
    try{
        const response = await fetch(`${baseURL}/brands`, {
            method: 'post',
            body: JSON.stringify(brandsObj),
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const newBrand = await response.json();

        return newBrand;
    }
    catch(err){
        console.error(err)
    }
}