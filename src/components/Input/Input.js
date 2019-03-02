import React from 'react';
import { Container, Input } from './Input.style';

export default props => (
	<Container flex={props.flex} right={props.right}>
		<label>{props.name}</label>
		<Input {...props.input} />
	</Container>
);
