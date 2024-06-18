const baseURL = 'http://localhost:3000/api';

//post new obj in users table

export async function registerUsers(usersObj) {
    try{
        const response = await fetch(`${baseURL}/users/register`, {
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

//log-in fetch

export async function login(userData) {
  console.log(userData)  
  try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      console.log(await response.json())
      const result = await response.json();
      console.log(result)
      if (result.token) {
        localStorage.setItem('token', JSON.stringify(result.token));
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }