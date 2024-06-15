import { useParams } from "react-router-dom";
import { getSingleWrestler } from "../api/wrestlers";
import { useState, useEffect } from "react";

export default function SingleWrestler(){
    const {wrestlerId} = useParams();

    const [ wrestler, setWrestler] = useState({})

    useEffect(()=>{
        async function oneWrestler(){
            try {
                const receivedWrestler = await getSingleWrestler(wrestlerId)
                setWrestler(receivedWrestler)
            }
            catch(err){
                console.error(err)
            }
        }
        oneWrestler()
    },[])
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
        <div className="container">
            <div className="card">
                <img src={wrestler.picture} alt={wrestler.name} className="wrestlerimg" />
                <div>
                    <h1 className="text-lg uppercase font-bold" >
                        {wrestler.wrestlername}
                    </h1>
                    <h2 className="text-lg">2K Rating: {wrestler.rating}</h2>
                    <p className='mt-2 text-gray-600 text-sm'> { wrestler.bio } </p>
                    <p className='mt-2 text-gray-600 text-sm'> { wrestler.category } </p>
                    <p className='mt-2 text-gray-600 text-sm'> { wrestler.championship } </p>
                </div>
                <div>
                {/* <button 
                onClick={handleClick}
                className='btn'
                >
                    Draft
                </button> */}
              </div>
            </div>
        </div>
    )
}