import styled from 'styled-components';

const Main = styled.main`
    width: 70%;
    padding: 30px;
    background-color: #ffffff;
    flex-grow: 1; /* Allows this element to grow and fill space */

    .profile-pic {
        display: block;
        max-width: 250px;
        border-radius: 10px;
        margin-top: 20px;
    }

    @media screen and (max-width: 750px) {
        width: 100%;
        order: 2; /* Ensures main content is below nav on mobile */
        text-align: center;
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