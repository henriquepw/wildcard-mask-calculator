import React, { Component } from 'react';

import GlobalStyle from '../../styles/globalStyle';
import { Container, Input, Text } from './App.style';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            addressBin: '',
            maskBin: '',
            mask: ''
        };
    }

    handleAddress = async ({ target }) => {
        await this.setState({ address: target.value });
        this.handleAddressBin();
    };

    handleMask = ({ target }) => {
        this.setState({ mask: target.value });
    };

    handleAddressBin = () => {
        const { address } = this.state;
        const addressBin = address
            .split('.')
            .map(block => new Number(block).toString(2))
            .reduce((final, now) => `${final}.${now}`);

        this.setState({ addressBin });
    };

    render() {
        return (
            <Container>
                <GlobalStyle />
                <h1>Wildcard Mask Calculator</h1>

                <Text display='block'>Digite o endereço de rede / mascara</Text>
                <Text display='block'>Decimal</Text>
                <Input
                    width='8em'
                    type='text'
                    placeholder='Network address'
                    value={this.state.address}
                    onChange={this.handleAddress}
                />
                <Text size='3em' margin='0px 15px 0px 15px'>
                    /
                </Text>
                <Input
                    width='1.8em'
                    type='number'
                    min='8'
                    max='30'
                    placeholder='24'
                    value={this.state.mask}
                    onChange={this.handleMask}
                />
                <Text margin='9px 0px 9px 15px'> -> </Text>
                <Text>255.255.255.0</Text>

                <Text display='block'>Binario</Text>

                <Input
                    width='17em'
                    type='text'
                    placeholder='11111111.11111111.11111111.11111111'
                    value={this.state.addressBin}
                    onChange={this.handleAddressBin}
                />
                <Text size='3em' margin='0px 15px 0px 15px'>
                    /
                </Text>
                <Input
                    width='17em'
                    type='text'
                    placeholder='11111111.11111111.11111111.11111111'
                    value={this.state.maskBin}
                    onChange={this.handlemaskBin}
                />
            </Container>
        );
    }
}

export default App;
