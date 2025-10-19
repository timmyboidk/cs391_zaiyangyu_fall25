import styled from 'styled-components';

const Main = styled.main`
  width: 70%;
  padding: 30px;
  background-color: #ffffff;
  min-height: 70vh;
  ul { padding-left: 20px; }

  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

export default function Skills(){
    return (
        <Main>
            <section>
                <h2>Technical Skills</h2>
                <ul>
                    <li>Proficiency in Java, Python, Node.js, and their frameworks.</li>
                    <li>Full-stack development experience, familiarity with industry tools in a production setting.</li>
                    <li>Experience in elaborating requirements and managing projects accordingly.</li>
                </ul>
            </section>
        </Main>
    );
};

