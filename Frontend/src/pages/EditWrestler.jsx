import { useParams, useNavigate } from "react-router-dom";
import { getSingleWrestler, updateWrestlerChampionship, removeChampion } from "../api/wrestlers";
import { useState, useEffect } from "react";
import { getBrands } from "../api/brands";
import { createNewRoster } from "../api/rosters";
import {useContext} from 'react';
import AuthContext from '../Context/AuhtContext';
import { getChampionships } from '../api/championshiops';

export default function EditWrestler(){
    const navigate = useNavigate()
    const { wrestlerId } = useParams();
    const [brands, setBrands] = useState([]);
    const [wrestler, setWrestler] = useState({});
    const [brandId, setBrandId] = useState(null)
    const { token } = useContext(AuthContext);
    const [championships, setChampionships] = useState([]);
    const [championshipId, setChampionshipId] = useState(null);
    const [newChamp, setNewChamp] = useState({})

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

    useEffect(()=>{
        async function renderChampionships(){
            try {
                const receivedChampionships = await getChampionships()
                console.log('cha', receivedChampionships)
                setChampionships(receivedChampionships);
            }
            catch(err){
                console.error(err)
            }
        }
        renderChampionships()
    },[])

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

    async function handleEdit(event){
        event.preventDefault()

        try{
            const editChamp = await updateWrestlerChampionship(token, wrestler.id, championshipId)
        }
        catch(err){
            console.error(err)
        }
    }

    async function handleRemove(event){
        event.preventDefault()

        try{
            const removeChamp = await removeChampion(token, wrestler.id)
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
                        <div className="editChampionshipContainer">
                        {wrestler.championship ? (
                        <>
                            <div className='editChampionshipBox'>
                            <img className="editChampionshipImg" src={wrestler.display} alt="championshipDisplay" />
                            </div>
                            <div 
                            className='removeChampBtnBox'
                            onClick={handleRemove}
                            >
                                <button>Remove Championship</button>
                            </div>
                        </>
                        ) : 
                        (
                        <>
                        
                        </>
                        )} </div>
                    </div>
                </div>
            </div>
            <h1 className="draftTitle">Edit Wrestler</h1>
            <div className='editChampionshipContainer'>
                {championships.map((championship) => {
                    return(
                        <div 
                        className='editChampionshipBox'
                        key={championship.id}
                        onClick={()=>{setChampionshipId(championship.id)}}><img
                        src={championship.display_picture}
                        className='editChampionshipImg'/></div>
                    )
                })}
            </div>
            {championshipId &&  <div className="btnBox"> <button
                className='draftBtn'
                onClick={handleEdit}>
                    Edit Champion
                    </button>
                    </div>}
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