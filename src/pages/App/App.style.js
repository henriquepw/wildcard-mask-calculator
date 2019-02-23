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
    margin: 9px 15px 9px 15px;
    font-size: 1.2em;

    ${({ margin }) =>
        margin && css`
            margin: ${margin};
        `}

    ${({ size }) =>
        size && css`
            font-size: ${size};
        `}

    ${({ display }) =>
        display && css`
            display: ${display};
        `}

    ${({ start }) =>
        start && css`
            grid-column-start: ${start};
        `}
    ${({ end }) =>
        end && css`
            grid-column-end: ${end};
        `}
`;

export { Container, Box, Header, Text };
