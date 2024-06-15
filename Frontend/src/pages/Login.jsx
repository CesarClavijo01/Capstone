import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "../components/nav.css";


export default function Login({ setCurrentToken }){
    const [username, setUsername]  = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const token = await getToken(username, password);
        setCurrentToken(token);
        navigate('/dashboard');}

    return(
        <>
        <form className="form">
        <h1 className="loginh1">Log-in</h1>
      <div className="Login">
        <div>
          <Label htmlFor="email2" value="User Email"/>
        </div>
        <TextInput id='email2' className="text" type="email" placeholder="email" required shadow />
      </div>
      <div className="Login">
        <div>
          <Label  htmlFor="password2" value="Password" />
        </div>
        <TextInput id='password2' type="Password" placeholder="password" required shadow />
      </div>
      
      <Button className="btn2" onClick={handleLogin} type="submit">Log-in</Button>
    </form>
        </>
    )
}