import styled, { css } from 'styled-components';
import { Container } from '../../styles/grid';
import Colors from '../../styles/colors';

const Box = styled(Container)`
	&::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;

		margin-left: -20px;
		margin-top: 5px;

		transform: rotate(-45deg);

		border: 0.35em solid black;
		border-color: transparent transparent #fff #fff;

		pointer-events: none;

		${({ disabled }) =>
			disabled &&
			css`
				border-color: transparent transparent rgba(255, 255, 255, 0.4)
					rgba(255, 255, 255, 0.4);
			`}
	}
`;

const Select = styled.select`
	background-color: transparent;

	width: 100%;
	font-size: 1.2em;
	padding: 5px;
	padding-left: 0;

	border: none;
	border-bottom: 3px solid ${Colors.secundaryTextColor};

	color: ${Colors.secundaryTextColor};
	outline: none;

	cursor: pointer;
	-webkit-appearance: none;

	${({ disabled }) =>
		disabled &&
		css`
			cursor: auto;
			color: rgba(255, 255, 255, 0.4);
			border-bottom-color: rgba(255, 255, 255, 0.4);
		`}
`;

const Option = styled.option`
	color: ${Colors.primaryTextColor};
	font-weight: bold;
	outline: none;
	margin: 10px;
	cursor: pointer;
`;
export { Box, Select, Option };
