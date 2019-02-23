import React from 'react';
import { Container, Input } from './Input.style';
import { AST_PropAccess } from 'terser';

export default props => (
    <Container flex={props.flex} right={props.right}>
        <label>{props.name}</label>
        <Input {...props.input} />
    </Container>
);
