import styled from 'styled-components';

const Main = styled.main`
  width: 70%;
  padding: 30px;
  background-color: #ffffff;
  min-height: 70vh;
  ul { padding-left: 20px; }
  article {
    border-bottom: 1px solid #EEE6CA;
    padding-bottom: 20px;
    margin-bottom: 20px;
    &:last-child {
      border-bottom: none;
    }
  }

  @media screen and (max-width: 750px) {
    width: 100%;
  }
`;

export default function Experience(){
    return (
        <Main>
            <section>
                <article>
                    <h2>Yicheng Tech - Boston, MA</h2>
                    <p><strong>Chief Technology Officer & Co-founder</strong> (May 2024 - Present)</p>
                    <ul>
                        <li>Defined a microservices architecture with Spring Boot, implemented backend service and oversaw testing, and deployed the system on AWS.</li>
                        <li>Translated UI/UX designs into an iOS app using Swift, developed a Node.js web interface, managed deployment, and guided the Apple Store approval process.</li>
                    </ul>
                </article>
                <article>
                    <h2>Caro Tech Co. - Shanghai, China</h2>
                    <p><strong>Internship</strong> (May 2023 - July 2023)</p>
                    <ul>
                        <li>Contributed to an AI-driven road inspection platform by cleaning labeled image sets, testing model training, validating detection accuracy, visualizing results, and preparing daily reports for supervisors.</li>
                        <li>Participated in refactoring the development stack for improved distributed computing capabilities and the deployment of models for data processing and real-time road damage detection.</li>
                    </ul>
                </article>
            </section>
        </Main>
    );
};

