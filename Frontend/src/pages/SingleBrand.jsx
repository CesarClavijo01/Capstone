import { useParams } from "react-router-dom";
import { getSingleBrand } from "../api/brands";
import { useState, useEffect } from "react";


export default function SingleBrand(){
    const {brandId} = useParams();

    const [ brand, setBrand] = useState({})

    useEffect(()=>{
        async function oneBrand(){
            try {
                const receivedBrand = await getSingleBrand(brandId)
                setBrand(receivedBrand)
            }
            catch(err){
                console.error(err)
            }
        }
        oneBrand()
    },[])
    if(brand.length === 0) {
        return(
            <div>Loading</div>
        )
    }

    if(!brand){
        return(
            <div>404 - Brand doesnt exist</div>
        )
    }

    return(
        <>
            <div>
                <div className="singleBrandCard">
                    <img src={brand.logo} alt={brand.name} className="brandimg"/>
                    <h1>{brand.brandname}</h1>
                    <h2>{brand.show_time}</h2>
                </div>
            </div>
        </>
    )
}