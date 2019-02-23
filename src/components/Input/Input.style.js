import styled, { css } from 'styled-components';
import Colors from '../../styles/colors';

const Container = styled.div`
    display: inline-block;
    
    label {
        display: block;
        font-size: 1.2em;
        margin: 0px;
    }
`;

const Input = styled.input`
    background-color: transparent;

    width: 100%;
    font-size: 1.2em;
    padding: 10px;
    border: none;
    border-bottom: 3px solid ${Colors.secundaryTextColor};

    color: ${Colors.secundaryTextColor};
    outline: none;

    ::placeholder {
        color: rgba(255, 255, 255, .4);
    }

    &:focus {
        border-bottom-color: ${Colors.header}
    }

    ${({ width }) =>
        width && css`
            width: ${width};
        `}

    ${({ start }) =>
        start && css`
            grid-column-start: ${start};
        `}
    ${({ end }) =>
        end && css`
            grid-column-start: ${end};
        `}
`;

export { Container, Input };
