import { useEffect, useState } from "react";
import styled from "styled-components";
import type {DisneyCharacter} from "./interfaces/DisneyCharacter.ts";
import CharacterDisplay from "./components/CharacterDisplay.tsx";

const AppContainer = styled.div`
    width: 90vw;
    margin: auto;
    border: 5px solid #005a9c;
    border-radius: 15px;
    overflow: hidden;
`;

export default function App() {
    // useState Hook to store character data.
    const [characters, setCharacters] = useState<DisneyCharacter[]>([]);

    // useEffect Hook to fetch data from the API when the component mounts.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const response = await fetch("https://api.disneyapi.dev/character");
                // The API nests the results in a 'data' property.
                const { data }: { data: DisneyCharacter[] } = await response.json();
                setCharacters(data);
            } catch (error) {
                console.error("Failed to fetch Disney characters:", error);
            }
        }

        fetchData()
            .then(()=>console.log("Okay"))
            .catch((e)=>console.log("Not okay"+e));

    }, []); // Empty dependency array ensures this runs only once.

    return (
        <AppContainer>
            <CharacterDisplay data={characters} />
        </AppContainer>
    );
}