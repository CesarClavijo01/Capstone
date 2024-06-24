import { useNavigate } from "react-router-dom";
import './nav.css'
import { useAuthStatus } from '../hooks/useAuthStatus';

export function WrestlerCard({wrestler}){
    const { loggedIn } = useAuthStatus();
    const navigate = useNavigate();

    function handleClick(){
        if(!loggedIn){
            navigate(`/wrestlers/${wrestler.id}`);
        }else{
            navigate(`/draftWrestler/${wrestler.id}`)
        }
    }

    return(
        <div className="container" onClick={handleClick}>
            <div className="card">
                <img src={wrestler.picture} alt={wrestler.name} className="wrestlerimg" />
                <div>
                    <h1 className="wrestlerH1" >
                        {wrestler.wrestlername}
                    </h1>
                    <h2 className="ratingH2">2K Rating: {wrestler.rating}</h2>
                </div>
                <div className="championshipContainer">
                    {wrestler.championship ? (
                        <>
                            <img className="championshipImg" src={wrestler.display} alt="championshipDisplay" />
                        </>
                    ) : 
                    (
                        <>
                        
                        </>
                    )} </div>
                
            </div>
        </div>
    )
}