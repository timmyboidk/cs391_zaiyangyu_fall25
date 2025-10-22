import styled from 'styled-components';
import Calculator from '../components/Calculator';

const Main = styled.main`
    width: 70%;
    padding: 30px;
    background-color: #ffffff;
    flex-grow: 1;

    p, ul {
        line-height: 1.7;
        margin-bottom: 15px;
    }

    h2 {
        color: #896C6C;
        margin-bottom: 15px;
        font-size: calc(1.25rem + 1vw);
        font-weight: 300;
        border-bottom: 2px solid #E5BEB5;
        padding-bottom: 10px;
    }

    h3 {
        margin-top: 20px;
        margin-bottom: 8px;
        color: #765a5a;
    }

    article {
        border-bottom: 1px solid #EEE6CA;
        padding-bottom: 20px;
        margin-bottom: 20px;
        &:last-child {
            border-bottom: none;
        }
    }

    .calculator-container {
        padding: 25px;
        /* FIX: Corrected the image path here */
        background-image: url('/calc.png');
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        border: none;

        h2 {
            color: #ffffff;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
            border-bottom-color: #ffffff;
        }
    }

    @media screen and (max-width: 750px) {
        width: 100%;
        order: 2;
        padding: 20px;

        h2 {
            text-align: center;
        }

        p {
            text-align: left;
        }
    }
`;
export default function Projects(){
    return (
        <Main>
            <section>
                <article>
                    <h2>Ride-Sharing App</h2>
                    <p>Defined and led a microservices architecture with Spring Boot, coordinated backend service implementation and testing, and deployed the complete system. Converted UI/UX designs into an iOS app using Swift, built a Node.js web interface for data monitoring, and managed the deployment and Apple Store approval process.</p>
                </article>
                <article>
                    <h2>Credit Card Fraud Analysis</h2>
                    <p>Analyzed 284,807 credit card transactions from Kaggle to assess financial losses and address dataset imbalance. Implemented a detection model that balanced precision and recall to improve baseline AUPRC scores and accurately identify fraudulent activities while refining performance with the team.</p>
                </article>
                <article className="calculator-container">
                    <h2>JavaScript Calculator</h2>
                    <Calculator />
                </article>
            </section>
        </Main>
    );
}
