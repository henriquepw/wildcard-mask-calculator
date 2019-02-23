import styled, { css } from 'styled-components';
import Colors from '../../styles/colors';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${Colors.primaryDarkColor};
    color: ${Colors.secundaryTextColor};

    width: 100vw;
    height: 100vh;
`;

const Box = styled.div`
    display: grid;
    grid-template-columns: 1fr 3em 1fr;
`;

const Header = styled.header`
    background-color: ${Colors.header};
    width: 100vw;
    h1 {
        margin: auto;
        padding-top: 0.8em;
        padding-bottom: 0.8em;

        font-size: 1.8em;
        text-align: center;
    }
`;

const Text = styled.label`
    vertical-align: bottom;
    font-size: 1.5em;

    ${({ size }) =>
        size && css`
            font-size: ${size};
        `}
`;

const Divider = styled.div`
    background-color: ${Colors.secundaryTextColor};
    width: 30%;
    height: 0.2em;
`;

export { Container, Box, Header, Text, Divider };
