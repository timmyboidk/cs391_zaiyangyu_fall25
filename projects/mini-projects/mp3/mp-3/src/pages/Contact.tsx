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
