import React from 'react';
import { Container, Input } from './Input.style';

export default props => (
    <Container>
        <label>{props.name}</label>
        <Input {...props.input} />
    </Container>
);
