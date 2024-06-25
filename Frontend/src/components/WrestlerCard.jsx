import { useNavigate } from "react-router-dom";
import './nav.css'
import { useAuthStatus } from '../hooks/useAuthStatus';
import { AdminContext } from '../Context/AdminContext';
import { useContext } from "react"

export function WrestlerCard({result}){
    const { loggedIn } = useAuthStatus();
    const navigate = useNavigate();
    const { admin } = useContext(AdminContext);

    function handleClick(){
        if(!loggedIn){
            navigate(`/wrestlers/${result.id}`);
        }else if(!admin){
            navigate(`/draftWrestler/${result.id}`)
        }else{
            navigate(`/editWrestler/${result.id}`)
        }
    }

    return(
        <div className="container" onClick={handleClick}>
            <div className="card">
                <img src={result.picture} alt={result.name} className="wrestlerimg" />
                <div>
                    <h1 className="wrestlerH1" >
                        {result.wrestlername}
                    </h1>
                    <h2 className="ratingH2">2K Rating: {result.rating}</h2>
                </div>
                <div className="championshipContainer">
                    {result.championship ? (
                        <>
                            <img className="championshipImg" src={result.display} alt="championshipDisplay" />
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