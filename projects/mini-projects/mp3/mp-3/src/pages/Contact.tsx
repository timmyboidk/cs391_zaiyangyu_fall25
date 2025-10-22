import styled from 'styled-components';

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
    .profile-pic {
        display: block;
        max-width: 250px;
        border-radius: 10px;
        margin-top: 20px;
    }

    @media screen and (max-width: 750px) {
        width: 100%;
        order: 2;
        padding: 20px;
        text-align: center;

        h2 {
            text-align: center;
        }
        p {
            text-align: left; }

        .profile-pic { margin: 20px auto 0; }
    }
`;

export default function Contact(){
    return (
        <Main>
            <section>
                <h2>Get in Touch</h2>
                <ul>
                    <li><strong>Email:</strong> <a href="mailto:zyu29@bu.edu">zyu29@bu.edu</a></li>
                    <li><strong>Phone:</strong> 860-605-8044</li>
                    <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/%E5%9C%A8%E5%BE%89-%E4%BD%99-060687273/" target="_blank" rel="noopener noreferrer">Zaiyang Yu</a></li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/timmyboidk" target="_blank" rel="noopener noreferrer">Zaiyang Yu's Github Page</a></li>
                </ul>
            </section>
        </Main>
    );
};
