import './nav.css'

export function RosterCard({roster}){


    return(
        <div className="container">
            <div className="card">
                <img src={roster.wrestlerpicture} alt={roster.name} className={`wrestlerimgbase ${roster.brandname}`} />
                <div>
                    <h1 className="wrestlerH1" >
                        {roster.wrestlername}
                    </h1>
                    <h2 className="ratingH2">2K Rating: {roster.rating}</h2>
                </div>
                <div className="championshipContainer">
                    {roster.championshipname ? (
                        <>
                            <img className="championshipImg" src={roster.championshipdisplaypicture} alt="championshipDisplay" />
                        </>
                    ) : 
                    (
                        <>
                        
                        </>
                    )} </div>
                
            </div>
        </div>
    )
}