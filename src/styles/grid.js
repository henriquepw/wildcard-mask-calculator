import styled, { css } from 'styled-components';

const Box = styled.main`
	width: 60vw;
	height: 100vh;
	min-width: 761px;
	max-width: 900px;

	display: grid;
	grid-template-columns: 1fr 3em 1fr;
	grid-template-rows: 1fr repeat(6, auto) 1fr;
`;

const Cell = styled.div`
    display: flex;
    align-items: flex-end;

    padding-bottom: 1.5em;

    ${({ rowAll }) =>
		rowAll &&
		css`
			grid-column: 1 / span 3;
		`}

    ${({ right }) =>
		right &&
		css`
			grid-column-start: 3;
		`}

    ${({ left }) =>
		left &&
		css`
			justify-content: right;
		`}

    ${({ center }) =>
		center &&
		css`
			justify-content: center;
		`}
`;

const Container = styled.div`
	width: 100%;

	label {
		display: block;
		font-size: 1.2em;
		margin: 0px;
	}

	${({ flex }) =>
		flex &&
		css`
			flex: ${flex};
		`}

	${({ right }) =>
		right &&
		css`
			margin-right: ${right};
		`}
`;

export { Box, Cell, Container };
