import CharacterDisplay from "./components/CharacterDisplay.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import type {DisneyCharacter} from "./interfaces/DisneyCharacter.ts";

const ParentDiv = styled.div`
    width: 80vw;
    margin: auto;
     border: 5px solid #005a9c;
`;

export default function App() {
    const [data, setData] = useState<DisneyCharacter[]>([]);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                    const rawData = await fetch("https://api.disneyapi.dev/character");
                const { data }: { data: DisneyCharacter[] } = await rawData.json();
                    setData(data);
            } catch (e) {
                if (e instanceof Error) {
                        console.log("There was an error: " + e.message);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <ParentDiv>
            <CharacterDisplay data={data} />
        </ParentDiv>
    );
}