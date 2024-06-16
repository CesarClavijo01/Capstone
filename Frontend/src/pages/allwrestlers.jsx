import { useEffect, useState } from "react";
import { getWrestlers } from "../api/wrestlers";
import { WrestlerCard } from "../components/WrestlerCard";
import "../components/nav.css";

export default function AllWrestlers(){
    const [wrestlers, setWrestlers] = useState([]);

    useEffect(()=>{
        
        async function renderWrestlers(){
            try{
                const receivedWrestlers = await getWrestlers();
                console.log(receivedWrestlers[0].wrestlername)
                setWrestlers(receivedWrestlers);
            }
            catch(err){
                console.error(err)
            }
        }
        renderWrestlers()
    },[]);
    return(
        <>
        <div className="cardContainer">
            {wrestlers.map((wrestler)=>{
                return(
                    <WrestlerCard
                    key={wrestler.id}
                    wrestler={wrestler}
                    />
                );
            })}
        </div>
        </>
    )
};