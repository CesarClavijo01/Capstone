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
                    <h1 className="text-lg uppercase font-bold" >
                        {wrestler.wrestlername}
                    </h1>
                    <h2 className="text-lg">2K Rating: {wrestler.rating}</h2>
                </div>
                
            </div>
        </div>
    )
}