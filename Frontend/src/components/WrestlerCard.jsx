import { useNavigate } from "react-router-dom";
import './nav.css'

export function WrestlerCard({wrestler}){
    const navigate = useNavigate();

    function handleClick(){
        navigate(`/api/wrestlers/${wrestler.id}`);
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
                
            </div>
        </div>
    )
}