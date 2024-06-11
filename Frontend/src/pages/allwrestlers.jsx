import { useEffect, useState } from "react";
import { getWrestlers } from "../api/wrestlers";
import { wrestlerCard } from "../components/wrestlerCard";

export default function AllWrestlers(){
    const [wrestlers, setWrestlers] = useState([]);

    useEffect(()=>{
        
        async function renderWrestlers(){
            try{
                const receivedWrestlers = await getWrestlers();
                setWrestlers(receivedWrestlers.wrestlers);
            }
            catch(err){
                console.error(err)
            }
        }
        renderWrestlers()
    },[]);
    return(
        <>
        <div className="grid sm:grid-cols-2 md:grids-cols-3 lg:grid-cols-4 gap-4 px-10">
            {wrestlers.map((wrestler)=>{
                return(
                    <wrestlerCard
                    key={wrestler.id}
                    wrestler={wrestler}
                    />
                );
            })}
        </div>
        </>
    )
};