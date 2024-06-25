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
      const result = await response.json();
      console.log('result', result)
      if (result.token) {
        localStorage.setItem('token', JSON.stringify(result.token));
        localStorage.setItem('admin', JSON.stringify(result.user.admin))
      }
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  //get me

  export async function getMe(token) {
    if (!token) return;
    try {
      const response = await fetch(`${baseURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      
      return result;
      
    } catch (error) {
      console.error(error);
    }
  };
