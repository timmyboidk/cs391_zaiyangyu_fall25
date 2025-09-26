import {useEffect,useState} from "react";
import type {ArtworkProps} from "../types.ts";
import ArtworkPreview from "../ArtworkPreview.tsx";

// export  default function ArtworksListContent(){
//     const [numArtworks, setNumArtworks] = useState(5);
//
//     return (
//         <div>
//             <input type="number" placeholder="Number of artworks" value={numArtworks}
//             onChange={(e) => setNumArtworks(Number(e.target.value))}/>
//             <div>
//                 <p>numArtworks: {numArtworks}</p>
//             </div>
//         </div>
//     )
// }

export default function ArtworksListContent() {
    const [numArtworks, setNumArtworks] = useState(5);
    const [artworks, setArtworks] = useState<ArtworkProps[]>([]);

    useEffect(() => {
        async function getArtworks() {
            const res = await fetch(
                `https://api.artic.edu/api/v1/artworks?limit=${numArtworks}`
            );
            const jsonRes = await res.json();
            setArtworks(jsonRes.data);
        }
        getArtworks().catch(e => console.log(e));
    }, [numArtworks]);

    return(
        <div>
            <h2>Artworks</h2>
            <input
                type="number"
                placeholder="Number of Artworks"
                value={numArtworks}
                min={1}
                onChange={(e)=>setNumArtworks(Number(e.target.value))}
            />
            <p>Number of Artworkds:{numArtworks}</p>
            <div>
                {artworks.map((a)=>{
                    return <ArtworkPreview artwork={a}/>;
            })}
            </div>
        </div>
    );
}