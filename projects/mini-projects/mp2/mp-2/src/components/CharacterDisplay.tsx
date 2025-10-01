import styled from "styled-components";
import type {DisneyCharacter} from "../interfaces/DisneyCharacter.ts";

const AllCharsDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: #f0f8ff; /* Light blue background */
`;

const SingleCharDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: #ffffff;
    border: 3px solid #005a9c;
    font: normal small-caps bold calc(2px + 1vw) 'Palatino', serif;
    text-align: center;
    color: #333;
`;

export default function CharacterDisplay(props: { data: DisneyCharacter[] }) {
    return (
        <AllCharsDiv>
            {
                props.data.map((char: DisneyCharacter) => (
                    <SingleCharDiv key={char._id}>
                        <h1>{char.name}</h1>
                        <img src={char.imageUrl} alt={`Image of ${char.name}`} style={{ width: '100%', borderRadius: '8px' }} />
                        {/* Displaying films and TV shows */}
                        <p>Films: {char.films.length > 0 ? char.films.join(', ') : 'None'}</p>
                        <p>TV Shows: {char.tvShows.length > 0 ? char.tvShows.join(', ') : 'None'}</p>
                    </SingleCharDiv>
                ))
            }
        </AllCharsDiv>
    );
}