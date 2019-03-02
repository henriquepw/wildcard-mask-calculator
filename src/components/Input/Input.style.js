import styled, { css } from 'styled-components';
import Colors from '../../styles/colors';

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

const Input = styled.input`
	background-color: transparent;

	width: 100%;
	font-size: 1.2em;
	padding: 5px;
	padding-left: 0;
	border: none;
	border-bottom: 3px solid ${Colors.secundaryTextColor};

	color: ${Colors.secundaryTextColor};
	outline: none;

	::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	&:focus {
		border-bottom-color: ${Colors.header};
	}

	${({ width }) =>
		width &&
		css`
			width: ${width};
		`}

	${({ disabled }) =>
		disabled &&
		css`
			border-bottom-color: rgba(255, 255, 255, 0.4);
		`}
`;

export { Container, Input };
