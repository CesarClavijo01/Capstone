import { useNavigate } from "react-router-dom";
import './nav.css'

export function BrandCard({brand}){
    const navigate = useNavigate();

    function handleClick(){
        navigate(`/brands/${brand.id}`);
    }

    return(
        <div className="brandCardContainer">
            <div className="brandCard">
            <img src={brand.logo} alt={brand.name} className="brandimg" onClick={handleClick}/>
            </div>
        </div>
    )
}