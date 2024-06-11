import { useNavigate } from "react-router-dom";
import './nav.css'

export function wrestlerCard({wrestler}){
    const navigate = useNavigate();

    function handleClick(){
        navigate(`/wrestlers/${wrestlers.id}`);
    }

    return(
        <div className="container">
            <div className="card">
                <img src={wrestler.picture} alt={wrestler.name} className="wrestlerimg" />
                <div>
                    <h1 className="text-lg uppercase font-bold" >
                        {wrestler.name}
                    </h1>
                    <h2 className="text-lg">{wrestler.rating}</h2>
                </div>
                <div>
                <button 
                onClick={handleClick}
                className='btn'
                >
                    More Info
                </button>
              </div>
            </div>
        </div>
    )
}