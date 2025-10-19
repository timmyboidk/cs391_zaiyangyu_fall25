import styled from 'styled-components';

const Main = styled.main`
  width: 70%;
  padding: 30px;
  background-color: #ffffff;
  min-height: 70vh;

  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

export default function Credits() {
    return (
        <Main>
            <section>
                <h2>Credits</h2>
                <p><strong>Name:</strong> Zaiyang Yu</p>
                <p><strong>ID:</strong> zyu29 U65169913</p>
                <p><strong>Education:</strong> Boston University </p>
            </section>
        </Main>
    );
};