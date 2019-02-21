import styled from 'styled-components';

const Container = styled.div`
    background-color: rgba(50, 50, 50);
    color: rgba(255, 255, 255, 0.8);
    width: 100vw;
    height: 100vh;

    h1 {
        margin: auto;
        padding-top: 1em;
        padding-bottom: 1em;

        font-size: 3em;
        text-align: center;
    }

    input {
        background-color: rgba(255, 255, 255, 0.8);
        padding: 10px;
        margin: 10px;
        border: 0px;

        font-size: 1.5em;
    }
`;

export { Container };
