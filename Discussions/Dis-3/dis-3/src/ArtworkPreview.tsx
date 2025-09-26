import styled from "styled-components";
import {ArtworkProps} from "./types.ts";

const ArtworkPreviewDiv = styled.div`
    margin: 10px;
    padding: 4px;
    width: 400px;
    background-color: lightblue;
`;

export default function ArtworkPreview({artwork}: {artwork: ArtworkProps}) {
    return (
        <ArtworkPreviewDiv>
            <h3>{artwork.title}</h3>
            <p>{artwork.place_of_origin}</p>
        </ArtworkPreviewDiv>
    )
}