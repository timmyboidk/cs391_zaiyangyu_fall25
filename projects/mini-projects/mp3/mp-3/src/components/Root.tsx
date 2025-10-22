import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from './GlobalStyle.tsx';
import styled from 'styled-components';
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "../pages/Home";
import Education from "../pages/Education";
import Experience from "../pages/Experience";
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/Contact';
import Credits from '../pages/Credits';

const AppWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1; 
`;
export default function Root() {
    return (
        <>
            <GlobalStyle />
            <Header />
            <AppWrapper>
            <Nav />
            <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/education`} element={<Education />} />
                <Route path={`/experience`} element={<Experience />} />
                <Route path={`/projects`} element={<Projects />} />
                <Route path={`/skills`} element={<Skills />} />
                <Route path={`/contact`} element={<Contact />} />
                <Route path={`/credits`} element={<Credits />} />
            </Routes>
            </ AppWrapper>
            <Footer />
        </>
    );
}