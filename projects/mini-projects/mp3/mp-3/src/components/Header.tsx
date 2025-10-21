import styled from 'styled-components';

const HeaderWrapper = styled.header`
    width: 100%;
    background-color: #896C6C;
    color: #F5FAE1;
    padding: 25px 30px;
    p {
        font-size: calc(1rem + 0.25vw);
        color: #EEE6CA;
    }
    h1 {
        font-size: calc(1.75rem + 1.5vw);
        font-weight: 300;
    }
    @media screen and (max-width: 750px) {
        padding: 20px 15px; /* Restored padding from mp1 feed backs*/
        text-align: center;
    }
`;

export default function  Header()  {
    return (
        <HeaderWrapper>
            <h1>Zaiyang Yu</h1>
            <p>My Online Resume</p>
        </HeaderWrapper>
    );
}

