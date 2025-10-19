import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        list-style: none;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        background-color: #F5FAE1;
        color: #5C4B4B;
        font-size: calc(1rem + 0.2vw);
    }

    #root {
        display: flex;
        flex-direction: column;
        max-width: 1200px;
        margin: 0 auto;
        border-left: 1px solid #EEE6CA;
        border-right: 1px solid #EEE6CA;
        width: 100%;
    }
`;