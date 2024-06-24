import { useParams, useNavigate } from "react-router-dom";
import { getSingleWrestler } from "../api/wrestlers";
import { useState, useEffect } from "react";
import { getBrands } from "../api/brands";
import { createNewRoster } from "../api/rosters";
import {useContext} from 'react';
import AuthContext from '../Context/AuhtContext'

export default function DraftWrestler(){
    const navigate = useNavigate()
    const { wrestlerId } = useParams();
    const [brands, setBrands] = useState([]);
    const [wrestler, setWrestler] = useState({});
    const [brandId, setBrandId] = useState(null)
    const { token } = useContext(AuthContext);

    useEffect(()=>{
        async function oneWrestler(){
            try {
                const receivedWrestler = await getSingleWrestler(wrestlerId)
                setWrestler(receivedWrestler);
            }
            catch(err){
                console.error(err)
            }
        }
        oneWrestler()
    },[])
    
    useEffect(() => {
        async function renderBrands(){
            try{
                const response = await getBrands()
                setBrands(response);
                console.log(brands);
            }
            catch(err){
                console.error(err)
            }
        }
        renderBrands()
    }, []);

    async function handleDraft(event){
        event.preventDefault()

        try{
            const newRoster = await createNewRoster(token, wrestlerId, brandId)

            if(newRoster.name == 'success'){
                navigate('/dashboard')
            }
        }
        catch(err){
            console.error(err)
        }
    }
    
    if(wrestler.length === 0) {
        return(
            <div>Loading</div>
        )
    }

    if(!wrestler){
        return(
            <div>404 - Wrestler doesnt exist</div>
        )
    }

    return(
        <>
            <div className="draftWrestlerContainer">
                <div className="card">
                    <img src={wrestler.picture} alt={wrestler.name} className="wrestlerimg" />
                    <div>
                        <h1 className="text-lg uppercase font-bold" >
                            {wrestler.wrestlername}
                        </h1>
                        <h2 className="text-lg">2K Rating: {wrestler.rating}</h2>
                        <p className='mt-2 text-gray-600 text-sm'> { wrestler.bio } </p>
                        <p className='mt-2 text-gray-600 text-sm'> { wrestler.category } </p>
                        <p className='mt-2 text-gray-600 text-sm'> { wrestler.accomplishments }</p>
                    </div>
                </div>
            </div>
            <h1 className="draftTitle">Draft Wrestler</h1>
            <div className="draftBrandsContainer">
                {brands.map((brand)=>{
                    return(
                        <div className="draftBrandBox" 
                        key={brand.id}
                        onClick={() => {setBrandId(brand.id)}}>
                            <img 
                            src={brand.logo} 
                            className="draftBrandLogo"/>
                        </div>
                    )
                })}
            </div>
            {brandId && <div className="btnBox">
                <button 
            className="draftBtn"
            onClick={handleDraft}>
                Draft
                </button>
                </div> }
        </>
    )
}