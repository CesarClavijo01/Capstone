import { getMe } from "../api/users";
import { getUserRosters } from "../api/rosters";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useState, useEffect } from "react";
import { RosterCard } from "../components/RosterCard";
import "../components/nav.css";

export default function Dashboard(){
    const [user, setUser] = useState(null);

    const [ rosters, setRosters] = useState([]);

    const {token} = useAuthStatus();

    useEffect(() => {
        (async function () {
          const loggedUser = await getMe(token);
          setUser(loggedUser.user);
          
        })();
      }, [token]);

      useEffect(()=>{
        
        async function renderRosters(){
            try{
                const receivedRosters = await getUserRosters(token);
                console.log('roster', receivedRosters)
                setRosters(receivedRosters);
            }
            catch(err){
                console.error(err)
            }
        }
        renderRosters()
    },[token]);

    return(
        <>
        <div className="rosterContainer">
        <div className="header">
        <h1>{user && user.first_name} {user && user.last_name}</h1>
        <h1>{user && user.username}</h1>
        </div>
        <div className="cardContainer">
          {rosters.map((roster)=>{
            return(
              <RosterCard
              key={roster.id}
              roster={roster}
              />
            )
          })}
        </div>
        </div>
        </>
    )
    
}