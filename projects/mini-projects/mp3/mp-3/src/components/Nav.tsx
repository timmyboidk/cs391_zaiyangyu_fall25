import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  width: 30%;
  background-color: #EEE6CA;
  padding: 20px;
  border-right: 1px solid #E5BEB5;

  ul {
    padding: 0;
  }

  a {
    display: block;
    padding: 12px 15px;
    margin-bottom: 8px;
    background-color: #896C6C;
    color: #F5FAE1;
    text-decoration: none;
    border-radius: 5px;
    text-align: center;
    transition: background-color 0.2s;
  }

  a.active, a:hover {
    background-color: #E5BEB5;
    color: #5C4B4B;
  }

  @media screen and (max-width: 750px) {
    width: 100%;
    border-right: none;
    background-color: #896C6C;
    padding: 5px;
    ul { display: flex; gap: 5px; }
    li { flex: 1; }
    a {
      background-color: #E5BEB5;
      color: #5C4B4B;
      border: 1px solid #d1a9a0;
      font-size: 0.8rem;
      padding: 8px 5px;
      margin-bottom: 0;
    }
  }
`;

export default function  Nav(){
    return (
        <NavWrapper>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/education">Education</NavLink></li>
                <li><NavLink to="/experience">Experience</NavLink></li>
                <li><NavLink to="/projects">Projects</NavLink></li>
                <li><NavLink to="/skills">Skills</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </NavWrapper>
    );
}

