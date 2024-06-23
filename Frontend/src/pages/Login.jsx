import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "../components/nav.css";
import { UserContext } from "../Context/UserContext";
import { login } from "../api/users";
import AuthContext from "../Context/AuhtContext";
import { AdminContext } from "../Context/AdminContext";



export default function Login(){

    
    const { setAdmin } = useContext(AdminContext)
    const { setToken } = useContext(AuthContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const userObj = {
      email: email,
      password: password,
    };
    

    const handleLogin = async (event) => {
        event.preventDefault(event);
        const response = await login(userObj);
        console.log('response', response)

        setToken(response.token);
        
        if(!response.token){
          setError(response.message);
          alert(response.message);
        }else{
          
          setAdmin(response.user.admin);
          navigate('/dashboard');
        }
        }

    

    return(
        <>
        <form className="form">
        <h1 className="loginh1">Log-in</h1>
      <div className="Login">
        <div>
          <Label htmlFor="email2" value="User Email"/>
        </div>
        <TextInput value={email} onChange={(event)=> setEmail(event.target.value)} id='email2' className="text"  type="email" placeholder="email" required shadow />
      </div>
      <div className="Login">
        <div>
          <Label  htmlFor="password2" value="Password" />
        </div>
        <TextInput value={password} onChange={(event)=> setPassword(event.target.value)} id='password2' type="Password" placeholder="password" required shadow />

      </div>
      
      <Button className="btn2" onClick={handleLogin} type="submit">Log-in</Button>
    </form>

        </>
    )
}