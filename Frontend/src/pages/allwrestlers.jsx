import { useEffect, useState } from "react";
import { getWrestlers } from "../api/wrestlers";
import { WrestlerCard } from "../components/WrestlerCard";
import "../components/nav.css";

export default function AllWrestlers(){
    const [wrestlers, setWrestlers] = useState([]);
    const [searchValue, setSearchValue] = useState('')

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

    const searchHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const searchResults = wrestlers.filter((wrestler) => {
        const lowerCaseWrestler = wrestler.wrestlername.toLowerCase();
        return lowerCaseWrestler.includes(searchValue.toLowerCase());
    })
    return(
        <>
        <input 
            className="searchBar" 
            placeholder="Search by Name" 
            onChange={searchHandler}
            value={searchValue}
        />
        <div className="cardContainer">
            {searchResults.map((result)=>{
                return(
                    <WrestlerCard
                    key={result.id}
                    result={result}
                    />
                );
            })}
        </div>
        </>
    )
};