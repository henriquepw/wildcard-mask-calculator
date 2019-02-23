import styled, { css } from 'styled-components';

const Box = styled.div`
    width: 80vw;
    height: 80vh;
    border: 1px solid #000;

    display: grid;
    grid-template-columns: 1fr 3em 1fr;
`;

const Cell = styled.div`
    border: 1px solid #200260;

    ${({ rowAll }) =>
        rowAll && css`
            grid-column-start: 1;
            grid-column-start: span 3;
        `}

    ${({ right }) =>
        right && css`
            grid-column-start: 3;
        `}
`;

export { Box, Cell };
