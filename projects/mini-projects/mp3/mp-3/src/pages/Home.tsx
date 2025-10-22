import styled from 'styled-components';

const Main = styled.main`
    width: 70%;
    padding: 30px;
    background-color: #ffffff;
    min-height: 100vh;
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

export default function Home() {
    return (
        <Main>
            <section>
                <h2>Welcome</h2>
                <p>
                    My name is Zaiyang Yu, and I am a Computer Science student at Boston University. Welcome to my
                    online resume website. Here you will find my educational background, work experience, projects, and
                    skills.
                </p>
                <img src="/zaiyang.png" alt="A photo of Zaiyang Yu" className="profile-pic"/>
            </section>
        </Main>
    );
};