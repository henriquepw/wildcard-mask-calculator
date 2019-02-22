import styled, { css } from 'styled-components';

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
`;

const Input = styled.input`
    background-color: rgba(255, 255, 255, 0.8);
    display: inline-block;

    padding: 10px;
    border: 0px;
    font-size: 1.5em;

    ${({ width }) => width && css`
        width: ${width};
    `}
`;

const Text = styled.p`
    display: inline-block;
    vertical-align: bottom;
    margin: 9px 15px 9px 15px;
    font-size: 1.8em;

    ${({ margin }) => margin && css`
        margin: ${margin};
    `}

    ${({ size }) => size && css`
        font-size: ${size};
    `}

    ${({ display }) => display && css`
        display: ${display};
    `}
`;

export { Container, Input, Text };
