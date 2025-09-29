import styled from "styled-components";
import type {DisneyCharacter} from "../interfaces/DisneyCharacter.ts";

const AllCharsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    background-color: #f0f8ff;
    padding: 20px;
`;

const SingleCharCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    padding: 16px;
    margin: 16px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Helvetica Neue', Arial, sans-serif;
    text-align: center;
`;

const CharacterImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 12px;
`;

const CharacterName = styled.h1`
    font-size: 1.8em;
    color: #333;
    margin: 10px 0;
`;

const InfoSection = styled.div`
    text-align: left;
    width: 100%;
    margin-top: 10px;

    h3 {
        color: #e25ed3;
        border-bottom: 2px solid #f0f8ff;
        padding-bottom: 4px;
        margin-bottom: 8px;
    }

    p {
        color: #555;
    }
`;

// Helper function to render lists, avoiding empty sections.
const renderList = (title: string, items: string[]) => {
    if (items.length === 0) return null;
    return (
        <InfoSection>
            <h3>{title}</h3>
            <p>{items.join(', ')}</p>
        </InfoSection>
    );
};

export default function CharacterDisplay(props: { data: DisneyCharacter[] }) {
    return (
        <AllCharsContainer>
            {props.data.map((char: DisneyCharacter) => (
                <SingleCharCard key={char._id}>
                    <CharacterName>{char.name}</CharacterName>
                    <CharacterImage src={char.imageUrl} alt={`Image of ${char.name}`} />
                    {renderList("Films", char.films)}
                    {renderList("TV Shows", char.tvShows)}
                    {renderList("Video Games", char.videoGames)}
                    {renderList("Park Attractions", char.parkAttractions)}
                    {renderList("Allies", char.allies)}
                    {renderList("Enemies", char.enemies)}
                </SingleCharCard>
            ))}
        </AllCharsContainer>
    );
}