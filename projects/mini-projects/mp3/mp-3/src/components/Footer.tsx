import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
    width: 100%;
     background-color: #896C6C;
    color: #F5FAE1;
    text-align: center;
    padding: 20px;
    a {
        color: #E5BEB5;
        text-decoration: none;
    }
`;
export default function Footer() {
    return (
        <FooterWrapper>
            <p> All Rights Reserved by Zaiyang Yu &#169;| <Link to="/credits">Credits</Link></p>
        </FooterWrapper>
    );
}

