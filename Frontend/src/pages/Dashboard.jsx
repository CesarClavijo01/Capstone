import { getMe } from "../api/users";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useState, useEffect } from "react";
import "../components/nav.css";

export default function Dashboard(){
    const [user, setUser] = useState(null);

    const {token} = useAuthStatus();

    useEffect(() => {
        (async function () {
          const loggedUser = await getMe(token);
          setUser(loggedUser.user);
          
        })();
      }, [token]);

    return(
        <>
        <div className="header">
        <h1 >Profile:</h1>
        <h2>Name: {user && user.first_name} {user && user.last_name}</h2>
        <h2>User Name: {user && user.username}</h2>
        <h3>Email: {user && user.email}</h3>
        </div>
        </>
    )
    
}