import './nav.css'
import { editUsers } from '../api/users'
import { useContext } from 'react'
import AuthContext from '../Context/AuhtContext';


export default function UserCard({user}) {
    const { token } = useContext(AuthContext);
    

    async function handleClick(){
        try{
        const edit = await editUsers(token, user.id)
        return edit
        }
        catch(err){
            console.error(err);
        }

        
    }

    return(
        <>
        <div>
        <ul className='User'> 
            <li>{user.first_name} {user.last_name}</li>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>Admin: {user.admin ? (<>true</>): (<>false</>)}</li>
        </ul>
        <button onClick={handleClick}>Make Admin</button>
        </div>
        </>
    )
}