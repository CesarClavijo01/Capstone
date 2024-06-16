const baseURL = 'http://localhost:3000/api';

//post new obj in users table

export async function registerUsers(usersObj) {
    try{
        const response = await fetch(`${baseURL}/users`, {
            method: 'post',
            body: JSON.stringify(usersObj),
            headers: {
                'content-type': 'application/json',
            }
        });
        const payload = await response.json();

        return payload;
    }
    catch(err){
        console.error(err)
    }
}