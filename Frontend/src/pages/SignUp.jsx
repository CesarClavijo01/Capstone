import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { registerUsers } from "../api/users";
import { UserContext } from "../Context/UserContext";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUp (){
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function newUser(evt) {
        evt.preventDefault();

        console.log('hello 1')

        const payload = await registerUsers( { fname, lname, uname, email, password});

        console.log('hello');

        setUser({
            first_name: payload.user.first_name,
            last_name: payload.user.last_name,
            username: payload.user.username,
            email: payload.user.username,
            token: payload.token,
        });

        navigate('/');
    }

    return(
        <>
        <form className="form">
        <h1 className="loginh1">Sign-up</h1>
        <div>
                <div className="Login">
                    <Label htmlFor="FirstName" value="First name" />
                </div>
                    <TextInput id="FirstName" type="name" value={ fname } placeholder="name" required shadow onChange={(evt) => setFname(evt.target.value)}/>
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="lastName" value="Last name" />
                </div>
                    <TextInput id="lastName" type="name" value={ lname } placeholder="last name" required shadow onChange={(evt) => setLname(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="userName" value="User name" />
                </div>
                    <TextInput id="userName" type="user" value={ uname } placeholder="User name" required shadow onChange={(evt) => setUname(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="email2" value="Your email" />
                </div>
                    <TextInput id="email2" type="email" value= { email } placeholder="email" required shadow onChange={(evt) => setEmail(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="password2" value="Your password" />
                </div>
                    <TextInput id="password2" type="password" value={ password } placeholder="password" required shadow onChange={(evt) => setPassword(evt.target.value)} />
            </div>
                <Button  onClick={ newUser }  className="btn2" type="submit">Register new account</Button>
        </form>
        </>
    )
}