import styled from 'styled-components';

const Main = styled.main`
  width: 70%;
  background-color: #ffffff;
  padding: 30px;
  min-height: 70vh;
  ul { padding-left: 20px; }

  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

export default function Education() {
    return (
        <Main>
            <section>
                <h2>Boston University - Boston, MA</h2>
                <p><strong>Bachelor in Computer Science, Minor in Psychology</strong> (Expected May 2026)</p>
                <p>GPA: 3.7 </p>
                <h3>Relevant Course Work:</h3>
                <ul>
                    <li>Data Structure and Algorithms</li>
                    <li>Analysis of Algorithms</li>
                    <li>Foundations of Data Science</li>
                    <li>Computer Organization</li>
                    <li>Intro to Web Security</li>
                    <li>Mobile App Development</li>
                </ul>
            </section>
        </Main>
    );
};

