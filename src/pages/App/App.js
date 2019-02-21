import React, { Component } from 'react';

import GlobalStyle from '../../styles/globalStyle';
import { Container } from './App.style';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Address: ''
        };
    }

    handleIp = ({ target }) => {
        this.setState({ address: target.value });
    };

    render() {
        return (
            <Container>
                <GlobalStyle />
                <h1>Wildcard Mask Calculator</h1>

                <input
                    type='text'
                    placeholder='Network address'
                    value={this.state.address}
                    onChange={this.handleAddress}
                />
            </Container>
        );
    }
}

export default App;
