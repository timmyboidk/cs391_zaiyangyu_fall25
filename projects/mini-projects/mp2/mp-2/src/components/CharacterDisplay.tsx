import styled from "styled-components";
import type {DisneyCharacter} from "../interfaces/DisneyCharacter.ts";

const AllCharsDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: #f0f8ff;
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
    font-family: Arial, sans-serif; 
    font-size: calc(8px + 0.5vw);   
    text-align: center;
     color: #333;

    h1 {
         font-size: calc(12px + 1vw);
    }

    img {
        width: 100%;
        border-radius: 8px;
        margin-top: 10px;
         margin-bottom: 10px;
    }

    p {
          margin: 5px 0;
    }
`;

export default function CharacterDisplay(props: { data: DisneyCharacter[] }) {
    return (
        <AllCharsDiv>
            {
                props.data.map((char: DisneyCharacter) => (
                    <SingleCharDiv key={char._id}>
                           <h1>{char.name}</h1>
                        <img src={char.imageUrl} alt={`Image of ${char.name}`} />
                        <p><b>Films:</b> {char.films.length > 0 ? char.films.join(', ') : 'None'}</p>
                        <p><b>TV Shows:</b> {char.tvShows.length > 0 ? char.tvShows.join(', ') : 'None'}</p>
                        <p><b>Video Games:</b> {char.videoGames.length > 0 ? char.videoGames.join(', ') : 'None'}</p>
                    </SingleCharDiv>
                ))
            }
        </AllCharsDiv>
    );
}