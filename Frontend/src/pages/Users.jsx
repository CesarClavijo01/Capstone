import { getAllUsers } from "../api/users";
import { useEffect, useState, useContext } from "react";
import UserCard from "../components/UserCard";
import "../components/nav.css";
import AuthContext from '../Context/AuhtContext';

export default function Users(){
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext)

    useEffect(()=>{
        async function renderUsers(){
            try{
                const receivedUsers = await getAllUsers(token);
                console.log(receivedUsers);
                setUsers(receivedUsers);
            }
            catch(err){
                console.error(err)
            }
        }
        renderUsers()
    },[]);
    return(
        <>
        <div>
            {users.map((user)=>{
                return(
                    <UserCard
                    key={user.id}
                    user={user}
                    />
                )
            })}
        </div>
        </>
    )
}