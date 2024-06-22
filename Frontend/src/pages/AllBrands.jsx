import { useEffect, useState } from "react";
import { getBrands } from "../api/brands";
import "../components/nav.css";
import { BrandCard } from "../components/BrandCard";

export default function AllBrands(){
    const [brands, setBrands] = useState([]);

    useEffect(()=>{
        
        async function renderBrands(){
            try{
                const receivedBrands = await getBrands();
                setBrands(receivedBrands);
            }
            catch(err){
                console.error(err)
            }
        }
        renderBrands()
    },[]);
    return(
        <>
        <div className="brandCardContainer">
            {brands.map((brand)=>{
                return(
                    <BrandCard
                    key={brand.id}
                    brand={brand}
                    />
                );
            })}
        </div>
        </>
    )
};